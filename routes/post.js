import express from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
} from "../controllers/post.js";
const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);

export default router;
