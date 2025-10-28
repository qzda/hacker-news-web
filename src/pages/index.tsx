import { useState, useEffect, useRef } from "react";
import {
  fetchTopStories,
  fetchNewStories,
  fetchBestStories,
} from "../api/index";
import useRequestCache from "../utils/hooks/useRequestCache";
import useIsMobile from "../utils/hooks/useIsMobile";
import Item from "../components/Item";
import Pagination from "../components/Pagination";

export default function IndexPage() {
  const tabs = {
    "Top Stories": fetchTopStories,
    "New Stories": fetchNewStories,
    "Best Stories": fetchBestStories,
  } as const;

  const [tabKey, setTabKey] = useState<keyof typeof tabs>("Top Stories");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedCount, setDisplayedCount] = useState(10);
  
  const isMobile = useIsMobile();
  const loadingIndicatorRef = useRef<HTMLDivElement>(null);

  const { data, refetch } = useRequestCache({
    key: tabKey,
    fetcher: tabs[tabKey],
  });

  // 每页显示的条数
  const pageSize = 10;

  // 监听"加载中..."元素，当它出现时自动加载更多
  useEffect(() => {
    if (!isMobile || !data || displayedCount >= data.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0]?.isIntersecting;
        
        if (isIntersecting && displayedCount < data.length) {
          setTimeout(() => {
            setDisplayedCount((prev) => Math.min(prev + pageSize, data.length));
          }, 300);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    const currentIndicator = loadingIndicatorRef.current;
    if (currentIndicator) {
      observer.observe(currentIndicator);
    }

    return () => {
      if (currentIndicator) {
        observer.unobserve(currentIndicator);
      }
    };
  }, [isMobile, data, displayedCount, pageSize]);

  // 切换 tab 时重置显示数量
  useEffect(() => {
    setCurrentPage(1);
    setDisplayedCount(pageSize);
  }, [tabKey, pageSize]);

  // 获取要显示的数据
  const displayedData = data
    ? isMobile
      ? data.slice(0, displayedCount)
      : data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  return (
    <div className="page-index">
      <div className="flex items-center gap-4"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#fff',
        }}
      >
        <div className="flex items-center gap-2">
          {Object.keys(tabs).map((tab) => {
            const isActive = tab === tabKey;

            return (
              <h2
                key={tab}
                className={`font-bold text-lg link ${
                  isActive ? "" : "text-gray-400"
                }`}
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
        {displayedData.map((i) => {
          return (
            <li
              key={i}
              className="border-base my-2 px-3"
            >
              <Item id={i} />
            </li>
          );
        })}
      </ul>

      {/* 移动端：显示加载提示 */}
      {isMobile && data && displayedCount < data.length && (
        <div 
          ref={loadingIndicatorRef}
          className="text-center py-4 text-gray-500 text-sm pointer-events-none"
        >
          加载中...
        </div>
      )}

      {/* 桌面端：显示分页器 */}
      {!isMobile && data && data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          total={data.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
