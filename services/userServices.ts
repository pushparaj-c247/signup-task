import userSchema from "../model/userModel";
import obj from "../interfaces/userInterface";
import { Request,Response } from "express";
import { validationResult } from "express-validator";


const signUpUser = async (obj: obj) => {
    const create = await userSchema.create(obj);
    return create;
  };
  const loginUser = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result["errors"][0] });
    }
    const { email, password } = req.body;
    const obj: obj | null = await userSchema.findOne({
      email: email,
    });
    if (!obj) {
      return res.status(401).json({
        message: "invalid username & password",
      });
    }
    
  const passwordMatch = await obj.validatePassword(password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "invalid password" });
  }
   return res.json({ message: "logged in successfully"});
    
  
  }

export { signUpUser, loginUser}