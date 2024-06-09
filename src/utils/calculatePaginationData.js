export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = totalPages - page > 0;
  const hasPreviosPage = page > 1;
  return {
    totalPages,
    hasNextPage ,
    hasPreviosPage ,
    page,
    perPage,
    totalItems: count,
  };
};
