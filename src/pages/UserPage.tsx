import React, { useMemo, useState } from "react";

import WidgetStack, { type WidgetConfig } from "../widgets/WidgetStack";
import PostGrid from "../components/post/PostGrid";
import CategoryTree from "../components/category/CategoryTree";

import type { TodoItem } from "../widgets/todo/WeeklyTodo";
import type { PostSummary } from "../types/post";

import { buildMonthGridDays, buildWeekDays, formatYMD } from "../utils/calendar/date";

import {
  makeMockTodosByDate,
  mockNowReadingBook,
  mockCategories,
  mockUserPosts,
} from "../mocks/userPageMock";
import { ALL_CATEGORY_ID, withAllCategory } from "../features/cetegory/categoryUtils";

type Tab = "home" | "post";

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const isFollowing = false;

  // ===== date base =====
  const today = useMemo(() => new Date(), []);
  const monthDays = useMemo(() => buildMonthGridDays(today), [today]);
  const weekDays = useMemo(() => buildWeekDays(today), [today]);

  // ===== mock data =====
  const todosByDate: Record<string, TodoItem[]> = useMemo(
    () => makeMockTodosByDate(weekDays),
    [weekDays]
  );

  const todayKey = useMemo(() => formatYMD(today), [today]);
  const todayTodos = useMemo(() => todosByDate[todayKey] ?? [], [todosByDate, todayKey]);

  // ===== category =====
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number>(ALL_CATEGORY_ID);

  const categories = useMemo(
    () => withAllCategory(mockCategories),
    []
  );

  // ===== posts =====
  const userPosts = useMemo<PostSummary[]>(() => mockUserPosts, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategoryId === ALL_CATEGORY_ID) return userPosts;
    return userPosts.filter((p) => (p.category?.categoryId ?? -1) === selectedCategoryId);
  }, [userPosts, selectedCategoryId]);

  // ===== widget =====
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
      nowReadingBook: mockNowReadingBook,
      today,
      weekDays,
      todosByDate,
      todayTodos,
      monthDays,
    }),
    [today, weekDays, todosByDate, todayTodos, monthDays]
  );

  return (
    <div>
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
              <CategoryTree
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelect={(c) => setSelectedCategoryId(c.categoryId)}
              />
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
                        active
                          ? "text-gray-900 font-semibold"
                          : "text-gray-400 hover:text-gray-600",
                      ].join(" ")}
                    >
                      {t.label}
                      {active && (
                        <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-gray-900" />
                      )}
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
                <PostGrid
                  posts={filteredPosts}
                  gapClassName="gap-4"
                  emptyText={
                    selectedCategoryId === ALL_CATEGORY_ID
                      ? "포스트가 없어여"
                      : "이 카테고리엔 포스트가 없어여"
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;