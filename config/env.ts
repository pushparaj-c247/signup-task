import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL ?? "";
const port = 4000;

export default {DB_URL, port}