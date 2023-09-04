import {signUpUserController, verifyMail, loginController} from "../controller/userController"
import { Router } from "express";
import * as  expressValidator from "../middleware/expressValidator";
const routers = Router();

routers.post("/signUpUser", signUpUserController);

routers.get("/verify", verifyMail)

routers.post("/login", [expressValidator.passwordValidation, expressValidator.emailValidation] , loginController)
export default routers;