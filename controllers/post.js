import Post from "../models/post.js";

export const createPost = async (req, res) => {
  const { text, photo, like } = req.body;
  const date = Date.now();
  const post = new Post({ text, photo, date, like });
  try {
    await post.save();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "something wrong, try again" });
  }
  return res.sendStatus(200);
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  return res.json(posts);
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "This post is not found" });
  }
  return res.json(post);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ message: "This post is not found" });
  }
  await Post.deleteOne({ _id: id });
  return res.status(200).json({ message: "post deleted" });
};
