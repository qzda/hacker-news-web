import { useCallback } from "react";
import * as timeago from "timeago.js";
import { fetchItemById } from "../api";
import useRequestCache from "../utils/hooks/useRequestCache";
import { shortUrl } from "../utils/url";
import { Link } from "react-router";

export default function Item(props: { id: string | number }) {
  const { id } = props;

  const fetchItem = useCallback(() => {
    return fetchItemById(id);
  }, [id]);

  const { data } = useRequestCache({
    key: "item" + id,
    fetcher: fetchItem,
  });

  const handleClick = useCallback(() => {
    if (data?.url) {
      //
    } else {
      //
    }
  }, [data]);

  return (
    <div>
      {data && (
        <div onClick={handleClick}>
          <h2>
            <a
              className="font-serif link"
              href={data.url}
              target="_blank"
            >
              {data.title}
            </a>
            {data.url && (
              <span className="mx-2 text-sm text-gray-400 op-75 hover:op-100 cursor-default">
                {shortUrl(data.url)}
              </span>
            )}
          </h2>
          <div className="text-sm text-gray-400 flex gap-4">
            <span>
              {data.score} points by{" "}
              <span className="text-gray-600 dark:text-gray-200">
                {data.by}{" "}
              </span>
              <span title={new Date(data.time * 1000).toLocaleString()}>
                {timeago.format(new Date(data.time * 1000))}
              </span>
            </span>
            <Link
              to={`/item/${data.id}`}
              className="link"
            >
              {data.descendants} comments
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
