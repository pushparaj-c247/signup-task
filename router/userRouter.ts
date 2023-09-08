import { signUpUserController, verifyMail, loginController } from "../controller/userController"
import { Router } from "express";
import {validateSignupFields, passwordValidation,emailValidation} from "../middleware/expressValidator";

const routers = Router();

routers.post("/signUpUser", validateSignupFields, signUpUserController);

routers.get("/verify", verifyMail)

routers.post("/login", [passwordValidation, emailValidation], loginController)

export default routers;