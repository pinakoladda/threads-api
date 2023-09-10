import "dotenv/config";
import express from "express";
import { connectDB } from "./utils/database.js";
import postRouter from "./routes/post.js";
import bp from "body-parser";
import { loggerMiddleware } from "./middlewares/logger.js";
import cors from "cors";
import { signin, signup } from "./controllers/auth.js";
import { authMiddleware } from "./middlewares/auth.js";

const port = 3000;
const app = express();
app.use(cors());
app.use(bp.json());

connectDB();

app.use(loggerMiddleware);

app.use("/posts", authMiddleware, postRouter);
app.post("/signup", signup);
app.post("/signin", signin);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
