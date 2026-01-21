import React from "react";

export type MonthlyCalendarProps = {
  today: Date;
  days: Date[];
  eventsByDate: Record<string, string[]>;
  onClickDate?: (date: Date, key: string) => void;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatYMD = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  today,
  days,
  eventsByDate,
  onClickDate,
}) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-gray-900">
          {today.getFullYear()}.{pad2(today.getMonth() + 1)}
        </div>
        <div className="text-sm text-gray-500">월간</div>
      </div>

      <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
          <div key={d} className="py-1 text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const key = formatYMD(d);
          const inMonth = d.getMonth() === today.getMonth();
          const isToday = isSameDay(d, today);
          const events = eventsByDate[key] ?? [];

          return (
            <button
              key={key}
              type="button"
              onClick={() => onClickDate?.(d, key)}
              className={[
                "relative rounded-xl text-left transition",
                "h-[120px]",
                inMonth ? "bg-white" : "bg-gray-50",
                isToday ? "ring-1 ring-gray-900" : "hover:bg-gray-50",
                "p-0",
              ].join(" ")}
            >
              <div
                className={[
                  "absolute top-2 left-2 text-sm font-semibold",
                  inMonth ? "text-gray-900" : "text-gray-400",
                ].join(" ")}
              >
                {d.getDate()}
              </div>

              {events.length > 0 && (
                <div className="absolute top-2 right-2 text-[11px] text-gray-500">
                  {events.length}
                </div>
              )}

              <div className="absolute left-2 right-2 top-8 bottom-2">
                <div className="h-full space-y-1 overflow-hidden">
                  {events.slice(0, 3).map((title, idx) => (
                    <div
                      key={`${key}-${idx}`}
                      className="h-4 rounded bg-gray-100 text-[11px] text-gray-700 px-1 truncate"
                      title={title}
                    >
                      {title}
                    </div>
                  ))}

                  {events.length > 3 && (
                    <div className="text-[11px] text-gray-500">
                      +{events.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MonthlyCalendar;