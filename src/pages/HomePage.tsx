import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostGrid from "../components/post/PostGrid";
import type { PostSummary } from "../types/post";
import { mockFeedPosts } from "../mocks/feedPosts";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<PostSummary[]>(mockFeedPosts);
  const [isLoading] = useState(false);

  const handleClickPost = (postId: number) => {
    navigate(`/post-detail?postId=${postId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-5 flex items-end justify-between">
          <div className="text-xl font-bold text-gray-900">Home</div>
          <div className="text-sm text-gray-500">추천순 | 최신순 | 팔로우</div>
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