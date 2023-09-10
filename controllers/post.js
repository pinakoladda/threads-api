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
