import { useState, useMemo, useCallback } from "react";

interface PaginationProps {
  /** 当前页码 (从1开始) */
  currentPage: number;
  /** 每页显示的条数 */
  pageSize: number;
  /** 总条数 */
  total: number;
  /** 页码改变的回调 */
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  pageSize,
  total,
  onPageChange,
}: PaginationProps) {
  const [inputValue, setInputValue] = useState("");

  const totalPages = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * pageSize + 1;
  }, [currentPage, pageSize]);

  const endIndex = useMemo(() => {
    return Math.min(currentPage * pageSize, total);
  }, [currentPage, pageSize, total]);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleJump = useCallback(() => {
    const page = parseInt(inputValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputValue("");
    }
  }, [inputValue, totalPages, onPageChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJump();
    }
  };

  if (total === 0) {
    return null;
  }

  return (
    <div className="pagination">
      <div className="flex items-center justify-between my-4">
        <div className="text-sm text-gray-600">
          Showing {startIndex}-{endIndex} of {total}
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "btn hover:bg-primary/10 text-primary"
            }`}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <i className="i-carbon-chevron-left" />
          </button>

          <div className="flex items-center gap-1 text-center">
            <span className="text-sm font-medium text-primary min-w-[40px] text-center">
              {currentPage}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-sm text-gray-600 min-w-[40px]">
              {totalPages}
            </span>
          </div>

          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-gray-300">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="页码"
              className="w-16 px-2 py-1 text-center border-base text-sm"
            />
            <button
              className="px-2 py-1 text-sm btn hover:bg-#ff6600/10 text-primary"
              onClick={handleJump}
            >
              Go
            </button>
          </div>

          <button
            className={`px-3 py-1 transition-colors ${
              currentPage >= totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "btn hover:bg-#ff6600/10 text-primary"
            }`}
            onClick={handleNext}
            disabled={currentPage >= totalPages}
          >
            <i className="i-carbon-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
