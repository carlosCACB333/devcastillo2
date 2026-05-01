export type SearchParams = { q?: string; page?: string };

export interface PaginationInfo {
  pageSize: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  showingStart: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
