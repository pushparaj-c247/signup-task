import mongoose from "mongoose";
import dotenv from "dotenv";
import {DB_URL} from "../config/env"
dotenv.config();

export function connections() {
  mongoose
    .connect(DB_URL)
    .then(() => console.log("DB connected "))
    .catch(() => console.log("error in DB"));
}

