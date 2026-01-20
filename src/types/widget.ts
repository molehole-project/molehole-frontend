export type WidgetPosition = "LEFT" | "RIGHT";

export type WidgetType =
  | "TODAY_TODO"
  | "MINI_CALENDAR"
  | "NOW_READING"
  | "WEEKLY_TODO"
  | "MONTHLY_CALENDAR"
  | "PINNED_POSTS";

export type UserHomeWidget = {
  widgetType: WidgetType;
  position: WidgetPosition;
  order: number;
  enabled: boolean;
  settings?: Record<string, any>;
};