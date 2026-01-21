import React from "react";

export type TodoItem = {
  id: number;
  title: string;
  done: boolean;
};

export type TodayTodoMiniProps = {
  today: Date;
  todos: TodoItem[]; // 오늘치만
  maxItems?: number; // 기본 3
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const TodayTodoMini: React.FC<TodayTodoMiniProps> = ({ today, todos, maxItems = 3 }) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-gray-900">오늘 할 일</div>
        <div className="text-sm text-gray-500">
          {pad2(today.getMonth() + 1)}/{pad2(today.getDate())}
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="text-sm text-gray-400 text-center py-6">없음</div>
      ) : (
        <div className="space-y-2">
          {todos.slice(0, maxItems).map((t) => (
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
                <div
                  className={[
                    "text-sm truncate",
                    t.done ? "text-gray-400 line-through" : "text-gray-700",
                  ].join(" ")}
                  title={t.title}
                >
                  {t.title}
                </div>
              </div>
            </div>
          ))}

          {todos.length > maxItems && (
            <div className="text-xs text-gray-500">+{todos.length - maxItems}개 더보기</div>
          )}
        </div>
      )}
    </section>
  );
};

export default TodayTodoMini;
