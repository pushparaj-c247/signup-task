import dotenv from "dotenv";

dotenv.config();

export const DB_URL = process.env.DB_URL ?? "";
export const Port = process.env.Port;
export const Key = process.env.Key
export const toEmail= process.env.toEmail
export const emailPassword = process.env.emailPassword
export const fromEmail= process.env.fromEmail
export const baseUrl= process.env.baseUrl