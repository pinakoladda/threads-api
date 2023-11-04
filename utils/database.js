import mongoose from "mongoose";
const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } =
  process.env;

export const connectDB = () => {
  mongoose
    .connect(
      `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?retryWrites=true&w=majority`,
    )
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.error(err);
    });
};
