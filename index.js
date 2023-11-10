import "dotenv/config";
import express from "express";
import { connectDB } from "./utils/database.js";
import postRouter from "./routes/post.js";
import bp from "body-parser";
import { loggerMiddleware } from "./middlewares/logger.js";
import cors from "cors";
import { getUser, signin, signup } from "./controllers/auth.js";
import { authMiddleware } from "./middlewares/auth.js";
import multer from "multer";
import { getUserByLogin } from "./controllers/user.js";

const upload = multer();
const port = 3000;
const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

connectDB();

app.use(loggerMiddleware);

app.use("/posts", authMiddleware, postRouter);
app.get("/user", authMiddleware, getUser);
app.get("/user/:login", authMiddleware, getUserByLogin);
app.post("/signup", upload.single("avatar"), signup);
app.post("/signin", signin);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
