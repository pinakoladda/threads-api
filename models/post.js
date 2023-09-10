import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const Post = new Schema({
  text: String,
  photo: String,
  date: Date,
  udateDate: Date,
  like: Boolean,
});

export default mongoose.model("Post", Post);
