import { Sequelize } from "sequelize";
import pg from "pg";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 5432;

// Function to create DB if it doesn't exist
export const ensureDatabaseExists = async () => {
  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASS,
    port: DB_PORT,
    database: "postgres", // connect to default DB
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`
    );
    if (res.rowCount === 0) {
      console.log(`📦 Database "${DB_NAME}" not found. Creating...`);
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`✅ Database "${DB_NAME}" created successfully!`);
    } else {
      console.log(`✅ Database "${DB_NAME}" already exists.`);
    }
  } catch (err) {
    console.error("❌ Error checking/creating database:", err);
  } finally {
    await client.end();
  }
};

// Sequelize connection
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
});
