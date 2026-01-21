import React from "react";

export type TodoItem = {
  id: number;
  title: string;
  done: boolean;
};

export type WeeklyTodoProps = {
  today: Date;
  weekDays: Date[]; // 7개
  todosByDate: Record<string, TodoItem[]>; // key: yyyy-mm-dd
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const formatYMD = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const DOW_KR = ["일", "월", "화", "수", "목", "금", "토"] as const;

const WeeklyTodo: React.FC<WeeklyTodoProps> = ({ today, weekDays, todosByDate }) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">이번 주 할 일</h3>
        <span className="text-sm text-gray-500">7일</span>
      </div>

      <div className="grid grid-cols-7 gap-2.5">
        {weekDays.map((d) => {
          const key = formatYMD(d);
          const items = todosByDate[key] ?? [];
          const dow = DOW_KR[d.getDay()];
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
                <div
                  className={[
                    "text-base font-bold",
                    isToday ? "text-blue-600" : "text-gray-900",
                  ].join(" ")}
                >
                  {d.getDate()}
                </div>
              </div>

              <div className="space-y-1">
                {items.length === 0 ? (
                  <div className="text-[12px] text-gray-400 px-1.5">없음</div>
                ) : (
                  <>
                    {items.slice(0, 2).map((t) => (
                      <div
                        key={t.id}
                        className={[
                          "text-[13px] px-1.5 py-0.5 rounded truncate leading-tight",
                          t.done
                            ? "bg-gray-200 text-gray-400 line-through"
                            : "bg-white text-gray-700 shadow-sm",
                        ].join(" ")}
                        title={t.title}
                      >
                        {t.title}
                      </div>
                    ))}
                    {items.length > 2 && (
                      <div className="text-[10px] text-gray-400 px-1.5">
                        +{items.length - 2}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WeeklyTodo;