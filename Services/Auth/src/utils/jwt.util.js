import jwt from "jsonwebtoken";
import config from "../config/env.config.js";
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (payload) => {
  return jwt.sign(payload,process.env.JWT_SECRET , { expiresIn:'1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
