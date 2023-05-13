const { AppError } = require("./custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  console.log(err instanceof AppError);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
