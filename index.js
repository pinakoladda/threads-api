import express from "express";
import { connectDB } from "./utils/database.js";
import postRouter from "./routes/post.js";
import bp from "body-parser";
import { loggerMiddleware } from "./middlewares/logger.js";

const port = 3000;
const app = express();
app.use(bp.json());

connectDB();

app.use(loggerMiddleware);

app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
