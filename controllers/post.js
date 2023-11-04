import Post from "../models/post.js";

const postAuthorPopulate = {
  path: "author",
  select: "avatar login name",
};

export const createPost = async (req, res) => {
  const { text, photo } = req.body;
  const date = Date.now();
  const author = res.locals.user;
  const post = new Post({ text, photo, date, author });
  if (!text && !photo) {
    return res.status(400).send({ message: "post must have text or photo" });
  }
  try {
    await post.save();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "something wrong, try again" });
  }
  return res.sendStatus(200);
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .sort({ date: -1 })
    .populate(postAuthorPopulate);
  const userId = res.locals.user._id;

  const data = posts.map((post) => {
    return {
      ...post._doc,
      likes: post.likes.length,
      isLiked: post.likes.includes(userId),
    };
  });

  return res.json(data);
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate(postAuthorPopulate);
  const userId = res.locals.user._id;

  if (!post) {
    return res.status(404).json({ message: "This post is not found" });
  }

  const data = {
    ...post._doc,
    likes: post.likes.length,
    isLiked: post.likes.includes(userId),
  };
  return res.json(data);
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

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { text, photo } = req.body;
  const updateDate = Date.now();
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ message: "This post is not found" });
  }
  post.text = text || post.text;
  post.photo = photo || post.photo;
  post.updateDate = updateDate;

  await post.save();
  return res.status(200).json({ message: "Post successfully updated" });
};

export const likePost = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  const userId = res.locals.user._id;

  if (!post) {
    return res.status(404).json({ message: "This post is not found" });
  }

  if (post.likes.includes(userId)) {
    return res.status(400).json({ message: "Post already liked" });
  }

  post.likes.push(userId);
  await post.save();
  return res.status(200).json({ message: "Post successfully liked" });
};

export const dislikePost = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  const userId = res.locals.user._id;

  if (!post) {
    return res.status(404).json({ message: "This post is not found" });
  }

  if (!post.likes.includes(userId)) {
    return res.status(400).json({ message: "Post already disliked" });
  }

  post.likes = post.likes.filter((like) => like === userId);

  await post.save();

  return res.status(200).json({ message: "Post successfully disliked" });
};
