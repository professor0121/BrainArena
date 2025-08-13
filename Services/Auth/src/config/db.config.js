import { Sequelize } from "sequelize";
import config from "./env.config.js";

const sequelize = new Sequelize(
  config.DB.NAME,
  config.DB.USER,
  config.DB.PASSWORD,
  {
    host: config.DB.HOST,
    dialect: config.DB.DIALECT,
    port: config.DB.PORT,
    logging: false
  }
);

export default sequelize;
