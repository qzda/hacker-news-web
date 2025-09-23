import { useCallback, useEffect, useState } from "react";
import { devLog } from "../log";

type Cache = {
  data: unknown;
  ttl: number;
  time: number;
};

const requestCache = new Map<string, Cache>();

type Options<T> = {
  key: string;
  fetcher: () => Promise<T>;
  /** 缓存有效期（ms），默认 5 分钟 */
  ttl?: number;
};

export default function useRequestCache<T>({
  key,
  fetcher,
  ttl = 1000 * 60 * 5,
}: Options<T>) {
  const [data, setData] = useState<T | null>(() => {
    const cached = requestCache.get(key);
    if (cached && Date.now() - cached.time < cached.ttl) {
      devLog("缓存命中", key);
      return cached.data as T;
    }
    return null;
  });
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = requestCache.get(key) as Cache;

    // 命中缓存，不再请求
    if (cached && Date.now() - cached.time < cached.ttl) {
      devLog("缓存命中", key);
      return;
    }

    let cancel = false;
    setLoading(true);

    fetcher()
      .then((res) => {
        if (cancel) return;
        setData(res);
        requestCache.set(key, { data: res, time: Date.now(), ttl });
        devLog("缓存", key);
      })
      .catch((err) => {
        if (cancel) return;
        setError(err);
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [key, ttl, fetcher]);

  const refetch = useCallback(() => {
    let cancel = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((res) => {
        if (cancel) return;
        setData(res);
        requestCache.set(key, { data: res, time: Date.now(), ttl });
        devLog("刷新并缓存", key);
      })
      .catch((err) => {
        if (cancel) return;
        setError(err);
      })
      .finally(() => {
        if (!cancel) setLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [key, ttl, fetcher]);

  setTimeout(() => {
    requestCache.forEach((cache, key) => {
      if (Date.now() - cache.time > cache.ttl) {
        requestCache.delete(key);
      }
    });
  });

  return { data, loading, error, refetch };
}
