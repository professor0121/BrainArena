import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  DB: {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "postgres",
    NAME: process.env.DB_NAME || "brainarena_auth",
    DIALECT: "postgres",
    PORT: process.env.DB_PORT || 5432
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || "supersecret",
    EXPIRES_IN: "1h"
  }
};
