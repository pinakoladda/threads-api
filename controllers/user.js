import User from "../models/user.js";

export const getUserByLogin = async (req, res) => {
  const login = req.params.login;
  if (!login) {
    return res.status(400).json({ message: "login is required" });
  }
  const user = await User.findOne({ login });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json(user);
};
