import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Post = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  photo: String,
  date: {
    type: Date,
    required: true,
  },
  updateDate: Date,
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

export default mongoose.model("Post", Post);
