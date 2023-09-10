import crypto from "crypto";

export const passwordEncryption = (password) => {
  return crypto
    .createHmac("sha256", process.env.PASSWORD_SALT)
    .update(password)
    .digest("hex");
};
