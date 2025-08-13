import jwt from "jsonwebtoken";
import config from "../config/env.config.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRES_IN });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.JWT.SECRET);
};
