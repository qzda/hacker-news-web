import { fetchTopStories } from "../api/index";
import useRequestCache from "../utils/hooks/useRequestCache";
import Item from "../components/Item";

export default function IndexPage() {
  const { data: topStories, refetch: refetchTopStories } = useRequestCache({
    key: "topStories",
    fetcher: fetchTopStories,
  });

  return (
    <div>
      <button
        className="btn"
        onClick={refetchTopStories}
      >
        Refetch <i className="i-carbon:rotate-360" />
      </button>
      <ul>
        {topStories &&
          topStories.slice(0, 10).map((i, index) => {
            return (
              <li
                key={i}
                className="border-base my-2 py-1 px-2 flex gap-2"
              >
                <span className="min-w-4 text-end text-gray-400">
                  {index + 1}
                </span>
                <Item id={i} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
