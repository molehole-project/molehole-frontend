import type { CategoryNode } from "../../types/category";

export const ALL_CATEGORY_ID = 0 as const;

export const withAllCategory = (nodes: CategoryNode[]): CategoryNode[] => {
  const total = nodes.reduce((sum, n) => sum + (n.postCount ?? 0), 0);

  const allNode: CategoryNode = {
    categoryId: ALL_CATEGORY_ID,
    name: "전체",
    depth: 0,
    postCount: total,
    children: [],
  };

  return [allNode, ...nodes];
};