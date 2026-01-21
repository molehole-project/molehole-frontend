import React, { useMemo, useState } from "react";
import WidgetStack, { type WidgetConfig } from "../widgets/WidgetStack";
import type { TodoItem } from "../widgets/todo/WeeklyTodo";
import type { NowReadingBook } from "../widgets/now-reading/NowReading";
import PostGrid from "../components/post/PostGrid";
import type { PostSummary } from "../types/post";

type Tab = "home" | "post";

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const isFollowing = false;

  // ===== helpers =====
  const pad2 = (n: number) => String(n).padStart(2, "0");

  const startOfMonthGrid = (date: Date) => {
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const day = first.getDay(); // 0:Sun
    const start = new Date(first);
    start.setDate(first.getDate() - day);
    return start;
  };

  const endOfMonthGrid = (date: Date) => {
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const day = last.getDay();
    const end = new Date(last);
    end.setDate(last.getDate() + (6 - day));
    return end;
  };

  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const formatYMD = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

  // ===== data (mock) =====
  const today = useMemo(() => new Date(), []);
  const monthDays = useMemo(() => {
    const start = startOfMonthGrid(today);
    const end = endOfMonthGrid(today);

    const arr: Date[] = [];
    for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
      arr.push(new Date(d));
    }
    return arr;
  }, [today]);

  const weekDays = useMemo(() => {
    const weekStart = addDays(today, -today.getDay());
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [today]);

  const todosByDate: Record<string, TodoItem[]> = useMemo(() => {
    const map: Record<string, TodoItem[]> = {
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
    return map;
  }, [weekDays]);

  const todayKey = useMemo(() => formatYMD(today), [today]);
  const todayTodos = useMemo(() => todosByDate[todayKey] ?? [], [todosByDate, todayKey]);

  const nowReadingBook: NowReadingBook = useMemo(
    () => ({
      title: "책 제목 한 줄",
      author: "저자 이름",
      progressPercent: 32,
    }),
    []
  );

  // ===== widget config =====
  const widgets: WidgetConfig[] = useMemo(
    () => [
      // LEFT (mini)
      { id: "L-NR", type: "NOW_READING", side: "left", order: 1 },
      { id: "L-TODAY", type: "TODO_TODAY_MINI", side: "left", order: 2 },
      { id: "L-CAL", type: "CALENDAR_MONTHLY_MINI", side: "left", order: 3 },

      // RIGHT (full)
      { id: "R-NR", type: "NOW_READING", side: "right", order: 1 },
      { id: "R-WEEK", type: "TODO_WEEKLY", side: "right", order: 2 },
      { id: "R-CAL", type: "CALENDAR_MONTHLY", side: "right", order: 3 },
    ],
    []
  );

  const widgetData = useMemo(
    () => ({
      nowReadingBook,
      today,
      weekDays,
      todosByDate,
      todayTodos,
      monthDays,
    }),
    [nowReadingBook, today, weekDays, todosByDate, todayTodos, monthDays]
  );

  return (
    <div className="">
      {/* User Header Image */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-100 border border-gray-200 h-48 flex items-center justify-center">
          <span className="text-gray-500">header image</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            {/* Profile Section */}
            <div className="mb-4">
              <div className="flex justify-center mb-3">
                <div className="w-20 h-20 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                  <span className="text-xs text-gray-500">profile</span>
                </div>
              </div>

              <div className="text-center mb-3">
                <div className="font-bold text-lg text-gray-900">nickname</div>
                <div className="text-sm text-gray-500">@accountId</div>
              </div>

              <div className="flex justify-center gap-4 text-sm text-gray-700">
                <span className="cursor-pointer hover:underline">
                  <strong>10</strong> 팔로잉
                </span>
                <span className="cursor-pointer hover:underline">
                  <strong>10</strong> 팔로워
                </span>
              </div>
            </div>

            {/* Follow Button */}
            <button
              className={[
                "w-full px-3 py-2 text-sm font-medium rounded-md mb-4 transition",
                isFollowing
                  ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  : "bg-gray-900 text-white hover:bg-gray-800",
              ].join(" ")}
            >
              {isFollowing ? "언팔로우" : "팔로우"}
            </button>

            {/* Bio */}
            <div className="bg-white border border-gray-200 p-4 mb-4 h-24 flex items-center justify-center text-sm text-gray-600">
              안녕뿡바구링들아?
            </div>

            {/* Left Area */}
            {activeTab === "home" ? (
              <WidgetStack side="left" widgets={widgets} data={widgetData} />
            ) : (
              <div className="bg-white border border-gray-200 p-6 h-40 flex items-center justify-center text-sm text-gray-600">
                category
              </div>
            )}
          </div>

          {/* Right Area */}
          <div className="col-span-9">
            {/* Tab Navigation */}
            <nav className="mb-4 border-b border-gray-200">
              <div className="flex gap-6 text-[15px]">
                {(
                  [
                    { key: "home", label: "전체" },
                    { key: "post", label: "포스트" },
                  ] as const
                ).map((t) => {
                  const active = activeTab === t.key;

                  return (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={[
                        "relative py-3 transition",
                        active ? "text-gray-900 font-semibold" : "text-gray-400 hover:text-gray-600",
                      ].join(" ")}
                    >
                      {t.label}
                      {active && <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-gray-900" />}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Content Area */}
            <div className="p-2 min-h-[400px]">
              {activeTab === "home" ? (
                <WidgetStack side="right" widgets={widgets} data={widgetData} />
              ) : (
                <div className="text-gray-500 text-lg text-center">
                  <PostGrid posts={userPosts as PostSummary[]} gapClassName="gap-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;