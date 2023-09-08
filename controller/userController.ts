import { signUpUser, loginUser } from "../services/userServices";
import userSchema from "../model/userModel";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import { ParsedQs } from 'qs'
import { Key, fromEmail, baseUrl } from "../config/env"
import transporter from "../config/transport";

const signUpUserController = async (
    req: Request,
    res: Response,
) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const errorResponse: Record<string, string> = {}; 
                for (const error of errors.array()) {
                  const { path, msg }: any= error; 
                  errorResponse[path] = msg;
                }
                return res.status(400).json({ errors: errorResponse });
              }
            }
        const signUp = await signUpUser(req.body);
        const email = req.body.email;
 // sending mail
    
        const token = jwt.sign({ email: email }, Key!, { expiresIn: '10m' });
        console.log(token)

        const mailOptions = {
            from: fromEmail,
            to: email,
            subject: "For Verification",
            html: '<p>Hii , Please click here to Verify your Account ✅ <a href="' + baseUrl + '/user/verify?token=' + token + '"> Click here to Verify </a> </p>'
        }
        transporter.sendMail(mailOptions, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                res.status(200)
                console.log("Email Sent")
            }
        })
        return res.send(signUp).status(200);
    }
    catch (error) {
        res.status(401).json(error)
    }
}
// // verify user afte get mail
const verifyMail = async (req: Request, res: Response) => {

    try {
        const tokens: string | string[] | ParsedQs | ParsedQs[] | undefined = req.query.token?.toString();
        const decodedToken: any = jwt.verify(tokens!, Key!);

        const userEmail = decodedToken.email;

        await userSchema.updateOne({ email: userEmail }, {
            $set: {
                is_Verified: true
            }
        });
        res.render("Verified")
    } catch (error) {
        res.status(401).json({ token: 'token Verification Failed' });
    }
}
// login user
const loginController = async (
    req: Request,
    res: Response,
) => {
    try {
        return await loginUser(req, res);
    }
    catch (error) {
        res.status(401).json("error in login User")
    }
};

export { signUpUserController, verifyMail, loginController }