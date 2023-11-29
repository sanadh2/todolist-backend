const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    msg: "The route does not exist",
  });
  next();
};
module.exports = notFound;
