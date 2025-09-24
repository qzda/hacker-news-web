import { useCallback } from "react";
import * as timeago from "timeago.js";
import { fetchItemById } from "../api";
import useRequestCache from "../utils/hooks/useRequestCache";
import { shortUrl } from "../utils/url";
import { Link } from "react-router";

export default function Item(props: {
  id: string | number;
  className?: string | undefined;
}) {
  const { id } = props;

  const fetchItem = useCallback(() => {
    return fetchItemById(id);
  }, [id]);

  const { data } = useRequestCache({
    key: id,
    fetcher: fetchItem,
  });

  return (
    <div className="com-item flex-1">
      {data && (
        <>
          {data.title && (
            <div className="flex items-center gap-2">
              <a
                className="font-serif link"
                href={data.url}
                target="_blank"
              >
                <h2>{data.title}</h2>
              </a>
              {data.url && (
                // todo 点击筛选短链
                <span className="mx-2 text-sm text-gray-400 op-75 hover:op-100 link">
                  <i className="i-carbon:link" /> {shortUrl(data.url)}
                </span>
              )}
            </div>
          )}
          {data.type === "comment" && (
            <div className="text-sm text-gray-400  flex gap-2">
              <span className="link text-gray-800 dark:text-gray-100">
                {data.by}
              </span>
              <span title={new Date(data.time * 1000).toLocaleString()}>
                {timeago.format(new Date(data.time * 1000))}
              </span>
            </div>
          )}
          {data.text && (
            <p
              className="text-sm p-2"
              dangerouslySetInnerHTML={{ __html: data.text }}
            ></p>
          )}
          {["story", "poll"].includes(data.type) && (
            <div className="text-sm text-gray-400 flex gap-2">
              <Link
                to={`/item/${data.id}`}
                className="link"
              >
                {data.type === "story" && <span>{data.score} points by </span>}
                <span className="text-gray-800 dark:text-gray-100">
                  {data.by}{" "}
                </span>
                <span title={new Date(data.time * 1000).toLocaleString()}>
                  {timeago.format(new Date(data.time * 1000))}
                </span>
              </Link>
              <Link
                to={`/item/${data.id}`}
                className="link"
              >
                {data.descendants} comments
              </Link>
            </div>
          )}
        </>
      )}
      {!data && (
        <div className="my-3 flex justify-center text-gray">
          <i className="i-carbon:rotate-180 animate-rotate" />
        </div>
      )}
    </div>
  );
}
