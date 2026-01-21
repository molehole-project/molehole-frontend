import type { CategoryNode } from "../types/category";
import type { PostSummary } from "../types/post";
import { formatYMD } from "../utils/calendar/date";
import type { NowReadingBook } from "../widgets/now-reading/NowReading";
import type { TodoItem } from "../widgets/todo/WeeklyTodo";


export const makeMockTodosByDate = (weekDays: Date[]): Record<string, TodoItem[]> => {
  return {
    [formatYMD(weekDays[1])]: [
      { id: 1, title: "JWT refresh 버그 잡기", done: false },
      { id: 2, title: "SSE 알림 UI 연결", done: true },
    ],
    [formatYMD(weekDays[2])]: [{ id: 3, title: "카테고리 트리 쿼리 최적화", done: false }],
    [formatYMD(weekDays[5])]: [
      { id: 4, title: "포스트 리스트 무한스크롤", done: false },
      { id: 5, title: "README 업데이트", done: false },
    ],
  };
};

export const mockNowReadingBook: NowReadingBook = {
  title: "책 제목 한 줄",
  author: "저자 이름",
  progressPercent: 32,
};

export const mockCategories: CategoryNode[] = [
  {
    categoryId: 1,
    name: "개발",
    depth: 0,
    postCount: 12,
    children: [
      {
        categoryId: 2,
        name: "Spring",
        depth: 1,
        postCount: 5,
        children: [{ categoryId: 3, name: "Security", depth: 2, postCount: 2, children: [] }],
      },
      { categoryId: 4, name: "React", depth: 1, postCount: 7, children: [] },
    ],
  },
];

export const mockUserPosts: PostSummary[] = [
  {
    postId: 101,
    status: "PUBLISHED",
    title: "JWT 재발급 구조 정리",
    excerpt: "access / refresh 토큰 분리와 재발급 흐름을 정리해봤다.",
    thumbnailUrl: null,
    author: { userId: 1, accountId: "accountId", nickname: "nickname", profileImageUrl: null },
    category: { categoryId: 1, name: "개발" },
    tags: [
      { tagId: 1, name: "JWT" },
      { tagId: 2, name: "Auth" },
    ],
    viewCount: 123,
    likesCount: 5,
    commentsCount: 2,
    isLiked: true,
    createdAt: "2026-01-10",
    updatedAt: "2026-01-11",
  },
  {
    postId: 102,
    status: "PUBLISHED",
    title: "QueryDSL 페이징 최적화 삽질기",
    excerpt: "fetchJoin과 ID 페이징의 차이를 직접 테스트해봤다.",
    thumbnailUrl: null,
    author: { userId: 1, accountId: "accountId", nickname: "nickname", profileImageUrl: null },
    category: { categoryId: 2, name: "Spring" },
    tags: [
      { tagId: 3, name: "QueryDSL" },
      { tagId: 4, name: "JPA" },
    ],
    viewCount: 87,
    likesCount: 12,
    commentsCount: 6,
    isLiked: false,
    createdAt: "2026-01-08",
  },
  {
    postId: 103,
    status: "PUBLISHED",
    title: "Electron + React 통신 구조",
    excerpt: "Chromium 위에서 돌아가는 React가 서버와 통신하는 방식",
    thumbnailUrl: null,
    author: { userId: 1, accountId: "accountId", nickname: "nickname", profileImageUrl: null },
    category: { categoryId: 3, name: "Security" },
    tags: [{ tagId: 5, name: "Electron" }],
    viewCount: 201,
    likesCount: 18,
    commentsCount: 9,
    isLiked: true,
    createdAt: "2026-01-05",
  },
  {
    postId: 104,
    status: "PUBLISHED",
    title: "React 컴포넌트 분리 기준",
    excerpt: "위젯/페이지/도메인 단위로 나누는 감각 정리",
    thumbnailUrl: null,
    author: { userId: 1, accountId: "accountId", nickname: "nickname", profileImageUrl: null },
    category: { categoryId: 4, name: "React" },
    tags: [{ tagId: 6, name: "Frontend" }],
    viewCount: 44,
    likesCount: 3,
    commentsCount: 1,
    isLiked: false,
    createdAt: "2026-01-03",
  },
];