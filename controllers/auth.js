import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { passwordEncryption } from "../utils/encryption.js";

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

  const user = new User({
    login,
    password: passwordEncryption(password),
    email,
    name,
    surname,
    birthDate,
    gender,
  });
  try {
    await user.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.sendStatus(200);
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
  const token = jwt.sign({ login }, process.env.JWT_SECRET);
  return res.status(200).json({ token });
};

export const getUser = async (req, res) => {
  return res.json(res.locals.user);
};
