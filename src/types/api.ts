export type CursorPage<T> = {
  items: T[];
  nextCursor?: string | null;
};

export type ApiError = {
  status: number;
  code?: string;
  message: string;
};