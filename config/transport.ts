import nodemailer from 'nodemailer';
import { toEmail, emailPassword } from "../config/env"
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: toEmail,
        pass: emailPassword
    }
});
export default transporter