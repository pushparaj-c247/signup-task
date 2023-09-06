import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL ?? "";
const port = 4000;
const key = 'secretkey'

export default { DB_URL, port, key }