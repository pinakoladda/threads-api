import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/threads")
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.error(err);
    });
};
