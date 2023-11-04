import express from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  likePost,
  dislikePost,
} from "../controllers/post.js";
const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);
router.put("/:id/like", likePost);
router.delete("/:id/like", dislikePost);

export default router;
