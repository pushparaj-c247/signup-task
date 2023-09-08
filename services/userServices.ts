import userSchema from "../model/userModel";
import obj from "../interfaces/userInterface";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const signUpUser = async (obj: obj) => {
  const create = await userSchema.create(obj);
  return create;
};
const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResponse: any = {};
    for (const error of errors.array()) {
      const { path, msg }: any = error;
      errorResponse[path] = msg;
    }
    return res.status(400).json({ errors: errorResponse });
  }
  const { email, password } = req.body;
  const detail: obj | null = await userSchema.findOne({
    email: email,
  });
  if (!detail) {
    return res.status(401).json({
      message: "invalid username & password",
    });
  }

  const passwordMatch = await detail.validatePassword(password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "invalid password" });
  }
  const token = jwt.sign({ email: detail.email, name: detail.name }, "ABcdefg", {
    expiresIn: "1h",
  });
  return res.status(200).json({ message: "logged in successfully", token });


}

export { signUpUser, loginUser }