export type PostStatus = "PUBLISHED" | "DRAFT" | "PRIVATE";
export type PostSort = "RECENT" | "POPULAR";

export type AuthorSummary = {
  userId: number;
  accountId: string;
  nickname: string;
  profileImageUrl?: string | null;
};

export type CategorySummary = {
  categoryId: number;
  name: string;
};

export type TagSummary = {
  tagId: number;
  name: string;
};

/**
 * ✅ Post 카드/리스트용 (Home Feed + UserPage 공용)
 * - 2열 카드 그리드가 이 타입을 받아서 뿌리면 됨
 */
export type PostSummary = {
  postId: number;
  status: PostStatus;

  title: string;
  excerpt?: string | null;

  // 대표 이미지(썸네일) — post_image role=THUMBNAIL 같은 개념
  thumbnailUrl?: string | null;

  // 작성자 / 분류
  author: AuthorSummary;
  category?: CategorySummary | null;
  tags?: TagSummary[];

  // 카운터 (DB에 view_count/likes_count/comment_count 있던 거 기준)
  viewCount: number;
  likesCount: number;
  commentsCount: number;

  // 로그인 시: 내가 좋아요 눌렀는지 (Post Like API랑 연결)
  isLiked?: boolean;

  createdAt: string; // ISO
  updatedAt?: string;
};

/**
 *  Post 상세용
 */
export type PostDetail = PostSummary & {
  content: string; // markdown or html (니가 쓰는 에디터 포맷)
  // 본문 inline 이미지 등은 나중에 확장 가능
};

/**
 * ✅ Feed 응답 (cursor 기반)
 * - 예: GET /feed?cursor=&size=&sort=
 */
export type FeedResponse = {
  posts: PostSummary[];
  nextCursor?: string | null;
};

/**
 * ✅ 유저 포스트 목록 응답 (cursor 기반)
 * - 예: GET /users/{userId}/posts?cursor=&size=&status=
 */
export type UserPostsResponse = {
  posts: PostSummary[];
  nextCursor?: string | null;
};

/**
 * ✅ 좋아요 토글 응답 (POST/DELETE /posts/{postId}/likes)
 * - 문서 확정본에서 likesCount 오타 잡았듯이: likesCount로 통일
 */
export type PostLikeResponse = {
  postId: number;
  likesCount: number;
  isLiked: boolean;
};