export interface PaginatedList<T> {
  items: T[];
  pageIndex: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

}
