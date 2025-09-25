import { useState } from "react";
import {
  fetchTopStories,
  fetchNewStories,
  fetchBestStories,
} from "../api/index";
import useRequestCache from "../utils/hooks/useRequestCache";
import Item from "../components/Item";

export default function IndexPage() {
  const tabs = {
    "Top Stories": fetchTopStories,
    "New Stories": fetchNewStories,
    "Best Stories": fetchBestStories,
  } as const;

  const [tabKey, setTabKey] = useState<keyof typeof tabs>("Top Stories");

  const { data, refetch } = useRequestCache({
    key: tabKey,
    fetcher: tabs[tabKey],
  });

  return (
    <div className="page-index">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {Object.keys(tabs).map((tab) => {
            const isActive = tab === tabKey;

            return (
              <h2
                key={tab}
                className={`font-bold text-lg link ${isActive ? "" : "text-gray-400"}`}
                onClick={() => {
                  setTabKey(tab as keyof typeof tabs);
                }}
              >
                {tab.split(" ")[0]}
              </h2>
            );
          })}
        </div>
        <button
          className="btn"
          onClick={refetch}
        >
          Refetch <i className="i-carbon:rotate-360" />
        </button>
      </div>

      <ul>
        {data &&
          // todo 翻页器
          data.slice(0, 10).map((i) => {
            return (
              <li
                key={i}
                className="border-base my-2 px-2 py-1"
              >
                <Item id={i} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
