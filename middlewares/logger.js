export const loggerMiddleware = (req, res, next) => {
  const time = new Date().toLocaleString();

  console.log(
    `[${time}] ${req.method} Request was made to: ` + req.originalUrl,
  );
  next();
};
