module.exports.getExpressError = (status, errorJson) => ({
    status,
    json: errorJson,
  });
  