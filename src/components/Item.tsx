import { useCallback } from "react";
import { Link } from "react-router";
import * as timeago from "timeago.js";
import { fetchItemById } from "../api";
import useRequestCache from "../utils/hooks/useRequestCache";
import { shortUrl } from "../utils/url";
import { isDev } from "../utils/dev";

export default function Item(props: {
  id: string | number;
  showMore?: boolean;
  className?: string | undefined;
}) {
  const { id } = props;

  const fetchItem = useCallback(() => {
    return fetchItemById(id);
  }, [id]);

  const { data } = useRequestCache({
    key: String(id),
    fetcher: fetchItem,
  });

  return (
    <div className="com-item">
      {data && (
        <>
          {data.title && (
            <div className="flex items-center flex-wrap gap-0 sm:gap-2">
              <a
                className={`font-serif font-bold link mr-2 ${props.showMore ? "text-xl" : ""}`}
                href={data.url}
                target="_blank"
              >
                <h2>{data.title}</h2>
              </a>
              {data.url && (
                // todo 点击筛选短链
                <span className="text-sm text-gray-400 op-75 hover:op-100 link">
                  <i className="i-carbon:link" /> {shortUrl(data.url)}
                </span>
              )}
              {isDev && <span className="bg-yellow px-1">{data.type}</span>}
            </div>
          )}
          {["story", "poll"].includes(data.type) && (
            <div className="text-sm text-gray-400 flex flex-wrap gap-0 sm:gap-2">
              <Link
                to={`/item/${data.id}`}
                className="link mr-2"
              >
                {data.type === "story" && <span>{data.score} points by </span>}
                <span className="text-gray-800! dark:text-gray-100!">
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
          {data.type === "comment" && (
            <div className="text-sm text-gray-400  flex gap-2">
              {/* todo 跳转到user页面 */}
              <span className="link text-gray-800 dark:text-gray-100">
                {data.by}
              </span>
              <span title={new Date(data.time * 1000).toLocaleString()}>
                {timeago.format(new Date(data.time * 1000))}
              </span>
            </div>
          )}
          {props.showMore && data.text && (
            <p
              className="item-text text-sm p-2 overflow-auto"
              dangerouslySetInnerHTML={{ __html: data.text }}
            ></p>
          )}
        </>
      )}
      {!data && (
        <div className="my-3 flex items-center justify-center gap-2 text-gray">
          <i className="i-carbon:rotate-180 animate-rotate" /> Loading...
        </div>
      )}
    </div>
  );
}
