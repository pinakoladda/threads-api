import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { passwordEncryption } from "../utils/encryption.js";
import { uploadFileToS3 } from "../utils/s3.js";

export const signup = async (req, res) => {
  const { login, password, email, name, surname, birthDate, gender } = req.body;
  if (!login || !password || !email || !name) {
    return res
      .status(400)
      .send({ message: "login, password, email and name are required" });
  }

  const duplicatetedUser = await User.findOne({ $or: [{ login }, { email }] });

  if (duplicatetedUser && duplicatetedUser.login === login) {
    return res.status(400).json({ message: "Login already exists" });
  }
  if (duplicatetedUser && duplicatetedUser.email === email) {
    return res.status(400).json({ message: "Email already exists" });
  }
  let avatar;

  if (req.file) {
    const extension = req.file.mimetype.split("/")[1];

    avatar = await uploadFileToS3(req.file, `${Date.now()}.${extension}`);
  }

  const user = new User({
    login,
    password: passwordEncryption(password),
    email,
    name,
    surname,
    birthDate,
    gender,
    avatar,
  });

  try {
    await user.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  const token = jwt.sign({ login }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRED_TIME,
  });
  return res.status(200).json({ token });
};

export const signin = async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({
    login,
    password: passwordEncryption(password),
  });
  if (!user) {
    return res.status(401).json({ message: "wrong login or password" });
  }
  const token = jwt.sign({ login }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRED_TIME,
  });
  return res.status(200).json({ token });
};

export const getUser = async (req, res) => {
  return res.json(res.locals.user);
};
