import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ login: data.login });

    res.locals.user = user;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};
