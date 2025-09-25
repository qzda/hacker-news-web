import { useParams } from "react-router";
import Item from "../components/Item";
import { useCallback } from "react";
import { fetchItemById } from "../api";
import useRequestCache from "../utils/hooks/useRequestCache";

export default function ItemPage() {
  const { id = "" } = useParams();

  const fetchItem = useCallback(() => {
    return fetchItemById(id);
  }, [id]);

  const { data } = useRequestCache({
    key: id,
    fetcher: fetchItem,
  });

  return (
    <div className="page-item">
      <div className="mb-6">
        <Item
          id={id}
          showMore
        />
      </div>

      {data?.kids && (
        <div className="comments">
          <h2>Comments</h2>
          <ul>
            {/* todo 翻页器 */}
            {data.kids.slice(0, 10).map((kid) => {
              return (
                <li
                  key={kid}
                  className="border-base my-2 py-1 px-2"
                >
                  <Item
                    className="flex-1"
                    id={kid}
                    showMore
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
