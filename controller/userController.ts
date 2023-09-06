import { signUpUser, loginUser } from "../services/userServices";
import userSchema from "../model/userModel";
import { Request, Response } from "express";
import nodemailer from "nodemailer"
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
const signUpUserController = async (
    req: Request,
    res: Response,
) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const errorResponse: any = {};
                for (const error of errors.array()) {
                    const { path, msg } = error;
                    errorResponse[path] = msg;
                }
                return res.status(400).json({ errors: errorResponse });
            }
            ;
        }
        const signUp = await signUpUser(req.body);
        const email = req.body.email;
        // sending mail

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "pushparaj.m@chapter247.com",
                pass: "gOLU@8120@",
            },
        });
        const token = jwt.sign({ email: email }, 'secretkey', { expiresIn: '10m' });
        console.log(token)
        const mailOptions = {
            from: '"pushparaj" <pushparaj.m@chapter247.com>',
            to: email,
            subject: "For Verification ",
            html: '<p> Hii , please click here to Verify your Account ✅ <a href="http://localhost:4000/user/verify?token=' + token + '">click here to Verify </a> </p>'
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
// // verify user afte get mail

const verifyMail = async (req: Request, res: Response) => {
    try {
        const tokens = req.query.token;
        const decodedToken = jwt.verify(tokens, 'secretkey');
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
        console.log("Error In LoginUser");
    }
};

export { signUpUserController, verifyMail, loginController }