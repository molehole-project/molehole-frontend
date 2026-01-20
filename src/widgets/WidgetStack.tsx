import React from "react";

import NowReading from "./now-reading/NowReading";
import NowReadingMini from "./now-reading/NowReadingMini";

import WeeklyTodo from "./todo/WeeklyTodo";
import TodayTodoMini from "./todo/TodayTodoMini";

import MonthlyCalendar from "./calendar/MonthlyCalendar";
import MonthlyCalendarMini from "./calendar/MonthlyCalendarMini";

import type { NowReadingBook } from "./now-reading/NowReading";
import type { TodoItem } from "./todo/WeeklyTodo";

export type WidgetSide = "left" | "right";

export type WidgetType =
  | "NOW_READING"
  | "TODO_WEEKLY"
  | "TODO_TODAY_MINI"
  | "CALENDAR_MONTHLY"
  | "CALENDAR_MONTHLY_MINI";

export type WidgetConfig = {
  id: string;
  type: WidgetType;
  side: WidgetSide;
  order: number;
  enabled?: boolean;
};

export type WidgetStackData = {
  nowReadingBook: NowReadingBook;

  today: Date;
  weekDays: Date[];
  todosByDate: Record<string, TodoItem[]>;
  todayTodos: TodoItem[];

  monthDays: Date[];
};

export type WidgetStackProps = {
  side: WidgetSide;
  widgets: WidgetConfig[];
  data: WidgetStackData;
};

const WidgetStack: React.FC<WidgetStackProps> = ({ side, widgets, data }) => {
  const list = widgets
    .filter((w) => (w.enabled ?? true) && w.side === side)
    .slice()
    .sort((a, b) => a.order - b.order);

  // ✅ mini 달력용 boolean map
  const hasEventByDate: Record<string, boolean> = React.useMemo(() => {
    const out: Record<string, boolean> = {};
    for (const [key, items] of Object.entries(data.todosByDate)) {
      out[key] = (items?.length ?? 0) > 0;
    }
    return out;
  }, [data.todosByDate]);

  // ✅ 큰 달력용 title[] map
  const eventsByDate: Record<string, string[]> = React.useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const [key, items] of Object.entries(data.todosByDate)) {
      out[key] = items.map((t) => t.title);
    }
    return out;
  }, [data.todosByDate]);

  return (
    <div className="space-y-4">
      {list.map((w) => {
        switch (w.type) {
          case "NOW_READING": {
            return side === "left" ? (
              <NowReadingMini key={w.id} book={data.nowReadingBook} />
            ) : (
              <NowReading key={w.id} book={data.nowReadingBook} />
            );
          }

          case "TODO_WEEKLY": {
            if (side === "left") return null;
            return (
              <WeeklyTodo
                key={w.id}
                today={data.today}
                weekDays={data.weekDays}
                todosByDate={data.todosByDate}
              />
            );
          }

          case "TODO_TODAY_MINI": {
            if (side === "right") return null;
            return <TodayTodoMini key={w.id} today={data.today} todos={data.todayTodos} />;
          }

          case "CALENDAR_MONTHLY": {
            if (side === "left") return null;
            return (
              <MonthlyCalendar
                key={w.id}
                today={data.today}
                days={data.monthDays}
                eventsByDate={eventsByDate}
              />
            );
          }

          case "CALENDAR_MONTHLY_MINI": {
            if (side === "right") return null;
            return (
              <MonthlyCalendarMini
                key={w.id}
                today={data.today}
                days={data.monthDays}
                hasEventByDate={hasEventByDate}
              />
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
};

export default WidgetStack;