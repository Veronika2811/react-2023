const getTotalPages = (count: number, perPage: number) => {
  return Math.ceil(count / perPage);
};

export default getTotalPages;
