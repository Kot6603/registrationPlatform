function errorHandler(error, _, response, next) {
  console.error(error.message);
  next(error);
}

export default errorHandler;
