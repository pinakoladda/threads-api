import mongoose from "mongoose";
const { DATABASE_HOST, DATABASE_NAME } = process.env;

export const connectDB = () => {
  mongoose
    .connect(`mongodb://${DATABASE_HOST}:27017/${DATABASE_NAME}`)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.error(err);
    });
};
