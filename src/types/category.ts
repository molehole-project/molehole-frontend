export type CategoryNode = {
  categoryId: number;
  name: string;
  depth: 0 | 1 | 2;
  postCount: number;
  children: CategoryNode[];
};

export type GetUserCategoriesResponse = {
  categories: CategoryNode[];
};