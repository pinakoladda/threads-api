import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const User = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: String,
  birthDate: Date,
  gender: String,
  avatar: String,
});

export default mongoose.model("User", User);