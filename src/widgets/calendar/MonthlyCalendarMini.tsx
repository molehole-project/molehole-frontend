import React from "react";

export type MonthlyCalendarMiniProps = {
  today: Date;
  days: Date[];
  hasEventByDate: Record<string, boolean>;
  onClickDate?: (date: Date, key: string) => void;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatYMD = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const MonthlyCalendarMini: React.FC<MonthlyCalendarMiniProps> = ({
  today,
  days,
  hasEventByDate,
  onClickDate,
}) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-gray-900">캘린더</div>
        <div className="text-sm text-gray-500">
          {today.getFullYear()}.{pad2(today.getMonth() + 1)}
        </div>
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
          const hasEvent = hasEventByDate[key] ?? false;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onClickDate?.(d, key)}
              className={[
                "h-8 rounded-md text-xs transition relative",
                inMonth ? "text-gray-800" : "text-gray-300",
                isToday ? "bg-gray-900 text-white" : "hover:bg-gray-50",
              ].join(" ")}
              title={key}
            >
              {d.getDate()}

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
  );
};

export default MonthlyCalendarMini;