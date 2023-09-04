import {signUpUser, loginUser} from "../services/userServices";
import userSchema from "../model/userModel";
import { Request, Response } from "express";
import nodemailer from "nodemailer"


const signUpUserController = async (
    req: Request,
    res: Response,

) => {

    try {
        const signUp = await signUpUser(req.body);
        const email = req.body.email;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "pushparaj.m@chapter247.com",
                pass: "gOLU@8120@",
            },
        });

        const mailOptions = {
            from: '"pushparaj 👻" <pushparaj.m@chapter247.com>',
            to: email,
            subject: "For Verification✔",
            html: '<p> Hii ,please click here to <a href="http://localhost:4000/verify?email=' + email + '">click on this to Verify </a> </p>'
        }
        transporter.sendMail(mailOptions, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log("Email has been sent")
            }
        })
        return res.send(signUp);
    }
    catch (error) {
        res.status(401).json(error)
    }
    
}

const verifyMail = async (req: Request, res: Response) => {
    await userSchema.updateOne({ email: req.query.email }, {
        $set: {
         is_Verified: true
        }
    })
    

    res.render("Verified")

}
const loginController = async (
    req: Request,
    res: Response,

  ) => {
    try {
      return await loginUser(req, res);
  
    }
    catch (error) {
      console.log("Error In LoginUser");
    }
  };

export { signUpUserController, verifyMail , loginController}