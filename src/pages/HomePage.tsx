import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostGrid from "../components/post/PostGrid";
import type { PostSummary } from "../types/post";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // ===== mock feed posts =====
  const initialPosts: PostSummary[] = useMemo(
    () => [
      {
        postId: 201,
        status: "PUBLISHED",
        title: "피드: QueryDSL 커서 페이징 정리",
        excerpt: "nextCursor 기반으로 무한스크롤 연결할 때 주의할 포인트들",
        thumbnailUrl: null,
        author: { userId: 2, accountId: "neo", nickname: "neo", profileImageUrl: null },
        category: { categoryId: 2, name: "Spring" },
        tags: [
          { tagId: 1, name: "QueryDSL" },
          { tagId: 2, name: "Pagination" },
        ],
        viewCount: 321,
        likesCount: 17,
        commentsCount: 4,
        isLiked: false,
        createdAt: "2026-01-20",
      },
      {
        postId: 202,
        status: "PUBLISHED",
        title: "피드: SSE 알림 구현 삽질기",
        excerpt: "SseEmitter 연결 끊김/재연결 전략과 서버 부담 줄이는 법",
        thumbnailUrl: null,
        author: { userId: 3, accountId: "mole", nickname: "mole", profileImageUrl: null },
        category: { categoryId: 1, name: "개발" },
        tags: [
          { tagId: 3, name: "SSE" },
          { tagId: 4, name: "Spring" },
        ],
        viewCount: 198,
        likesCount: 33,
        commentsCount: 9,
        isLiked: true,
        createdAt: "2026-01-18",
      },
      {
        postId: 203,
        status: "PUBLISHED",
        title: "피드: Electron에서 React가 서버랑 통신되는 원리",
        excerpt: "Chromium/HTTPS/도메인/리버스프록시까지 한 번에 묶기",
        thumbnailUrl: null,
        author: { userId: 1, accountId: "accountId", nickname: "nickname", profileImageUrl: null },
        category: { categoryId: 4, name: "React" },
        tags: [{ tagId: 5, name: "Electron" }],
        viewCount: 455,
        likesCount: 58,
        commentsCount: 12,
        isLiked: false,
        createdAt: "2026-01-15",
      },
      {
        postId: 204,
        status: "PUBLISHED",
        title: "피드: 성능 최적화 체크리스트",
        excerpt: "인덱스/쿼리/캐시/동시성 이슈를 어디부터 잡을까",
        thumbnailUrl: null,
        author: { userId: 4, accountId: "sage", nickname: "sage", profileImageUrl: null },
        category: { categoryId: 3, name: "Security" },
        tags: [{ tagId: 6, name: "Performance" }],
        viewCount: 129,
        likesCount: 8,
        commentsCount: 1,
        isLiked: false,
        createdAt: "2026-01-13",
      },
    ],
    []
  );

  const [posts, setPosts] = useState<PostSummary[]>(initialPosts);
  const [isLoading] = useState(false);

  // ===== handlers =====
  const handleClickPost = (postId: number) => {
    // 라우트가 /post-detail 고정이면 아래처럼
    // (나중에 /posts/:postId 로 바꾸면 더 깔끔해여)
    navigate(`/post-detail?postId=${postId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Feed Container */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">Home</div>
          </div>

          {/* 나중에 sort / filter 자리 */}
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