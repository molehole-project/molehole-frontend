import React, { useState } from 'react';

type Tab = 'home' | 'post';

const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const isFollowing = false;

  //helper
  const pad2 = (n: number) => String(n).padStart(2, "0");

  const startOfMonthGrid = (date: Date) => {
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const day = first.getDay(); // 0:Sun
    const start = new Date(first);
    start.setDate(first.getDate() - day);
    return start;
  };

  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatYMD = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

  const endOfMonthGrid = (date: Date) => {
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0); // 이번 달 마지막 날
    const day = last.getDay(); // 0:Sun
    const end = new Date(last);
    end.setDate(last.getDate() + (6 - day)); // 토요일까지
    return end;
  };


  // todo 더미
  const today = new Date();
  const monthStart = startOfMonthGrid(today);
  const monthEnd = endOfMonthGrid(today);

  const days: Date[] = [];
  for (let d = new Date(monthStart); d <= monthEnd; d = addDays(d, 1)) {
    days.push(new Date(d));
  }

  const weekStart = addDays(today, -today.getDay());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const mockTodos: Record<string, { id: number; title: string; done: boolean }[]> = {
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
  const todayKey = formatYMD(today);
  const todayTodos = mockTodos[todayKey] ?? [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-2">
          <h3 className="text-xl font-bold text-gray-900">molehole</h3>
        </div>
      </header>

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
              {/* Profile Image */}
              <div className="flex justify-center mb-3">
                <div className="w-20 h-20 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                  <span className="text-xs text-gray-500">profile</span>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-3">
                <div className="font-bold text-lg text-gray-900">nickname</div>
                <div className="text-sm text-gray-500">@accountId</div>
              </div>

              {/* Follow Stats */}
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

            {/* Left Widget / Category */}
            <div className="">
              {activeTab === "home" ? (
                <div className="space-y-4">
                  {/* Left Widget (Home) - Now Reading Mini */}
                  <section className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-900">Now Reading</div>
                      <div className="text-sm text-gray-500">1권</div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="w-full rounded-xl bg-gray-50 p-3">
                        <div className="flex items-center justify-center gap-3">
                          {/* cover */}
                          <div className="h-16 w-11 rounded-lg bg-white ring-1 ring-gray-200 shadow-sm flex items-center justify-center text-[10px] text-gray-400">
                            cover
                          </div>

                          {/* info */}
                          <div className="min-w-0 text-center">
                            <div className="text-sm font-semibold text-gray-900 truncate">
                              책 제목 한 줄
                            </div>
                            <div className="text-xs text-gray-500 truncate mt-0.5">
                              저자 이름
                            </div>

                            {/* progress mini */}
                            <div className="mt-2">
                              <div className="text-[11px] text-gray-500 mb-1">32%</div>
                              <div className="h-1.5 w-32 max-w-full rounded-full bg-white ring-1 ring-gray-200 overflow-hidden mx-auto">
                                <div className="h-full bg-gray-900" style={{ width: "32%" }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>


                  {/* Left Widget (Home) - Today Todo */}
                  <section className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-900">오늘 할 일</div>
                      <div className="text-sm text-gray-500">{pad2(today.getMonth() + 1)}/{pad2(today.getDate())}</div>
                    </div>

                    {todayTodos.length === 0 ? (
                      <div className="text-sm text-gray-400 text-center py-6">없음</div>
                    ) : (
                      <div className="space-y-2">
                        {todayTodos.slice(0, 3).map((t) => (
                          <div
                            key={t.id}
                            className={[
                              "flex items-start gap-2 rounded-md px-2 py-1.5",
                              t.done ? "bg-gray-100" : "bg-gray-50",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "mt-[2px] inline-block h-3.5 w-3.5 rounded border",
                                t.done ? "bg-gray-900 border-gray-900" : "border-gray-300 bg-white",
                              ].join(" ")}
                            />
                            <div className="min-w-0">
                              <div className={["text-sm truncate", t.done ? "text-gray-400 line-through" : "text-gray-700"].join(" ")}>
                                {t.title}
                              </div>
                            </div>
                          </div>
                        ))}

                        {todayTodos.length > 3 && (
                          <div className="text-xs text-gray-500">+{todayTodos.length - 3}개 더보기</div>
                        )}
                      </div>
                    )}
                  </section>

                  {/* Left Widget (Home) - Mini Calendar */}
                  <section className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-900">캘린더</div>
                      <div className="text-sm text-gray-500">{today.getFullYear()}.{pad2(today.getMonth() + 1)}</div>
                    </div>

                    <div className="grid grid-cols-7 text-[10px] text-gray-400 mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => (
                        <div key={idx} className="text-center py-1 leading-none">
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {days.map((d) => {
                        const key = formatYMD(d);
                        const inMonth = d.getMonth() === today.getMonth();
                        const isToday = isSameDay(d, today);
                        const hasEvent = (mockTodos[key]?.length ?? 0) > 0; // 더미: 일정 유무 점 표시

                        return (
                          <button
                            key={key}
                            className={[
                              "h-8 rounded-md text-xs transition relative",
                              inMonth ? "text-gray-800" : "text-gray-300",
                              isToday ? "bg-gray-900 text-white" : "hover:bg-gray-50",
                            ].join(" ")}
                            title={key}
                          >
                            {d.getDate()}

                            {/* 일정 점 (있는 날만) */}
                            {hasEvent && !isToday && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-gray-400" />
                            )}
                            {hasEvent && isToday && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-white/80" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 p-6 h-40 flex items-center justify-center text-sm text-gray-600">
                  category
                </div>
              )}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="col-span-9">
            {/* Tab Navigation */}
            <nav className="mb-4 border-b border-gray-200">
              <div className="flex gap-6 text-[15px]">
                {(
                  [
                    { key: 'home', label: '전체' },
                    { key: 'post', label: '포스트' },
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
                <div className="w-full space-y-6">
                  {/* Now Reading (TOP) */}
                  <section className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-900">Now Reading</div>
                      <div className="text-sm text-gray-500">1권</div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-md rounded-xl bg-gray-50 p-4">
                        <div className="flex items-center gap-4">
                          {/* book cover */}
                          <div className="h-20 w-14 rounded-lg bg-white shadow-sm ring-1 ring-gray-200 flex items-center justify-center text-[11px] text-gray-400">
                            cover
                          </div>

                          {/* book info */}
                          <div className="min-w-0 text-center flex-1">
                            <div className="font-semibold text-gray-900 truncate">
                              책 제목 한 줄
                            </div>
                            <div className="text-sm text-gray-500 truncate mt-1">
                              저자 이름
                            </div>

                            {/* progress */}
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span>progress</span>
                                <span>32%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-white ring-1 ring-gray-200 overflow-hidden">
                                <div className="h-full bg-gray-900" style={{ width: "32%" }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Weekly Todo */}
                  <section className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">이번 주 할 일</h3>
                      <span className="text-sm text-gray-500">7일</span>
                    </div>

                    <div className="grid grid-cols-7 gap-2.5">
                      {weekDays.map((d) => {
                        const key = formatYMD(d);
                        const items = mockTodos[key] ?? [];
                        const dow = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
                        const isToday = isSameDay(d, today);

                        return (
                          <div
                            key={key}
                            className={[
                              "rounded-lg p-2.5 h-[140px] transition-all",
                              isToday
                                ? "bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-400"
                                : "bg-gray-50 hover:bg-gray-100",
                            ].join(" ")}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-[13px] font-medium text-gray-500">{dow}</div>
                              <div className={[
                                "text-base font-bold",
                                isToday ? "text-blue-600" : "text-gray-900"
                              ].join(" ")}>
                                {d.getDate()}
                              </div>
                            </div>

                            <div className="space-y-1">
                              {items.slice(0, 2).map((t) => (
                                <div
                                  key={t.id}
                                  className={[
                                    "text-[13px] px-1.5 py-0.5 rounded truncate leading-tight",
                                    t.done ? "bg-gray-200 text-gray-400 line-through" : "bg-white text-gray-700 shadow-sm"
                                  ].join(" ")}
                                  title={t.title}
                                >
                                  {t.title}
                                </div>
                              ))}
                              {items.length > 2 && (
                                <div className="text-[10px] text-gray-400 px-1.5">+{items.length - 2}</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Monthly Calendar (BOTTOM, larger cells for schedules) */}
                  <section className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-900">
                        {today.getFullYear()}.{pad2(today.getMonth() + 1)}
                      </div>

                      {/* 여기 나중에 월 이동 버튼 넣으면 됨 */}
                      <div className="text-sm text-gray-500">월간</div>
                    </div>

                    <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                        <div key={d} className="py-1 text-center">{d}</div>
                      ))}
                    </div>

                    {/* bigger grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {days.map((d) => {
                        const key = formatYMD(d);
                        const inMonth = d.getMonth() === today.getMonth();
                        const isToday = isSameDay(d, today);

                        // 일정 더미: 실제로는 API로 key(yyyy-mm-dd)로 조회해서 배열로 넣어주면 됨
                        const events = mockTodos[key]?.map((t) => t.title) ?? []; // 일단 투두를 이벤트처럼 표시

                        return (
                          <button
                            key={key}
                            className={[
                              "relative rounded-xl text-left transition",
                              "h-[120px]",
                              inMonth ? "bg-white" : "bg-gray-50",
                              isToday ? "ring-1 ring-gray-900" : "hover:bg-gray-50",
                              "p-0", // 🔥 패딩은 안쪽 박스들이 관리
                            ].join(" ")}
                          >
                            {/* 날짜: 왼쪽 위 고정 */}
                            <div
                              className={[
                                "absolute top-2 left-2 text-sm font-semibold",
                                inMonth ? "text-gray-900" : "text-gray-400",
                              ].join(" ")}
                            >
                              {d.getDate()}
                            </div>

                            {/* 일정 개수: 오른쪽 위 고정 */}
                            {events.length > 0 && (
                              <div className="absolute top-2 right-2 text-[11px] text-gray-500">
                                {events.length}
                              </div>
                            )}

                            {/* 일정 영역: 위에서부터 시작하도록 absolute로 박아버리기 */}
                            <div className="absolute left-2 right-2 top-8 bottom-2">
                              <div className="h-full space-y-1 overflow-hidden">
                                {events.slice(0, 3).map((title, idx) => (
                                  <div
                                    key={idx}
                                    className="h-4 rounded bg-gray-100 text-[11px] text-gray-700 px-1 truncate"
                                    title={title}
                                  >
                                    {title}
                                  </div>
                                ))}

                                {events.length > 3 && (
                                  <div className="text-[11px] text-gray-500">+{events.length - 3}</div>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              ) : (
                <div className="text-gray-500 text-lg text-center">
                  <div>post list or</div>
                  <div>post detail</div>
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