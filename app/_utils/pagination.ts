import { PaginationInfo } from '../_types';

interface RawPaginationInfo {
  pageInfo: {
    __typename?: 'PageInfo' | undefined;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
    pageSize?: number | null | undefined;
  };

  aggregate: {
    __typename?: 'Aggregate' | undefined;
    count: number;
  };
  currentPage: number;
}

export const getPaginationInfo = ({ pageInfo, aggregate, currentPage }: RawPaginationInfo): PaginationInfo => {
  const pageSize = pageInfo.pageSize ?? 0;
  const totalCount = aggregate.count;
  const totalPages = Math.max(Math.ceil(totalCount / pageSize), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const showingStart = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  return {
    hasNextPage: pageInfo.hasNextPage,
    hasPreviousPage: pageInfo.hasPreviousPage,
    pageSize,
    totalCount,
    totalPages,
    currentPage: safeCurrentPage,
    showingStart,
  };
};
