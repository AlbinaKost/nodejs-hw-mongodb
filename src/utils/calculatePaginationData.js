export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviosPage = page !== 1;
  return {
    totalPages,
    hasNextPage ,
    hasPreviosPage ,
    page,
    perPage,
    totalItems: count,
  };
};
