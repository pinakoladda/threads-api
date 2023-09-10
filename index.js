import express from "express";
import { connectDB } from "./utils/database.js";
import postRouter from "./routes/post.js";
import bp from "body-parser";

const port = 3000;
const app = express();
app.use(bp.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
