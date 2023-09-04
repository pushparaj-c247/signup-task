"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.verifyMail = exports.signUpUserController = void 0;
const userServices_1 = require("../services/userServices");
const userModel_1 = __importDefault(require("../model/userModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const signUpUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signUp = yield (0, userServices_1.signUpUser)(req.body);
        const email = req.body.email;
        const transporter = nodemailer_1.default.createTransport({
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
        };
        transporter.sendMail(mailOptions, function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email has been sent");
            }
        });
        return res.send(signUp);
    }
    catch (error) {
        res.status(401).json(error);
    }
});
exports.signUpUserController = signUpUserController;
const verifyMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.updateOne({ email: req.query.email }, {
        $set: {
            is_Verified: true
        }
    });
    res.render("Verified");
});
exports.verifyMail = verifyMail;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, userServices_1.loginUser)(req, res);
    }
    catch (error) {
        console.log("Error In LoginUser");
    }
});
exports.loginController = loginController;
