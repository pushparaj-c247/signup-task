import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export function connections() {
  
    mongoose
      .connect('mongodb://127.0.0.1:27017/SignUp')
      .then(() => console.log("DB connected "))
      .catch(() => console.log("error in DB"));
  }

