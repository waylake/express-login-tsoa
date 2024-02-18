import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const MONGO_URI = process.env.MONGO_URI;
const API_VERSION = process.env.API_VERSION;
const AWS_SES_ACCESS_KEY = process.env.AWS_SES_ACCESS_KEY;
const AWS_SES_SECRET_ACCESS_KEY = process.env.AWS_SES_SECRET_ACCESS_KEY;

export const envConfig = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URI,
  API_VERSION,
  AWS_SES_ACCESS_KEY,
  AWS_SES_SECRET_ACCESS_KEY,
};
