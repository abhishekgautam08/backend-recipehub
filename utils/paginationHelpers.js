 const getSkipLimitByPage = ({ page = 1, pageSize = 50 }) => {
  const limit = pageSize <= 0 || pageSize > 500 ? 50 : Number(pageSize);


  const derivedPage = page <= 0 ? 1 : page;

  const skip = (derivedPage - 1) * limit;

  return { skip, limit };
};


module.exports = {
  getSkipLimitByPage,
};