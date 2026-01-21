export const pad2 = (n: number) => String(n).padStart(2, "0");

export const formatYMD = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

export const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const startOfMonthGrid = (date: Date) => {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const day = first.getDay(); // 0:Sun
  const start = new Date(first);
  start.setDate(first.getDate() - day);
  return start;
};

export const endOfMonthGrid = (date: Date) => {
  const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const day = last.getDay();
  const end = new Date(last);
  end.setDate(last.getDate() + (6 - day));
  return end;
};

export const buildMonthGridDays = (today: Date) => {
  const start = startOfMonthGrid(today);
  const end = endOfMonthGrid(today);

  const arr: Date[] = [];
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
    arr.push(new Date(d));
  }
  return arr;
};

export const buildWeekDays = (today: Date) => {
  const weekStart = addDays(today, -today.getDay());
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
};