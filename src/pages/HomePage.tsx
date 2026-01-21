import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostGrid from "../components/post/PostGrid";
import type { PostSummary } from "../types/post";
import { mockFeedPosts } from "../mocks/feedPosts";

type FeedSort = "RECOMMEND" | "RECENT" | "FOLLOW";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [posts] = useState<PostSummary[]>(mockFeedPosts);
  const [isLoading] = useState(false);

  const [sort, setSort] = useState<FeedSort>("RECOMMEND");

  const handleClickPost = (postId: number) => {
    navigate(`/post-detail?postId=${postId}`);
  };

  const sortItems = useMemo(
    () =>
      [
        { key: "RECOMMEND" as const, label: "추천순" },
        { key: "RECENT" as const, label: "최신순" },
        { key: "FOLLOW" as const, label: "팔로우" },
      ],
    []
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-5 border-b border-gray-200">
          <div className="grid grid-rows-2 pb-2">
            <div />
            <div className="flex justify-end items-end text-base text-gray-500 leading-tight">
              {sortItems.map((item, idx) => {
                const active = sort === item.key;

                return (
                  <React.Fragment key={item.key}>
                    <button
                      type="button"
                      onClick={() => setSort(item.key)}
                      className={[
                        "relative transition",
                        active
                          ? "text-gray-900 font-bold"
                          : "hover:text-gray-900",
                      ].join(" ")}
                    >
                      {item.label}

                      {active && (
                        <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gray-900" />
                      )}
                    </button>

                    {idx !== sortItems.length - 1 && (
                      <span className="mx-3 text-gray-300">|</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <PostGrid
          posts={posts}
          isLoading={isLoading}
          gapClassName="gap-4"
          onClickPost={handleClickPost}
        />
      </div>
    </div>
  );
};

export default HomePage;