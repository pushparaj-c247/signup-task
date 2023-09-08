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
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const transport_1 = __importDefault(require("../config/transport"));
const signUpUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const errorResponse = {};
                for (const error of errors.array()) {
                    const { path, msg } = error;
                    errorResponse[path] = msg;
                }
                return res.status(400).json({ errors: errorResponse });
            }
        }
        const signUp = yield (0, userServices_1.signUpUser)(req.body);
        const email = req.body.email;
        // sending mail
        const token = jsonwebtoken_1.default.sign({ email: email }, env_1.Key, { expiresIn: '10m' });
        console.log(token);
        const mailOptions = {
            from: env_1.fromEmail,
            to: email,
            subject: "For Verification",
            html: '<p>Hii , Please click here to Verify your Account ✅ <a href="' + env_1.baseUrl + '/user/verify?token=' + token + '"> Click here to Verify </a> </p>'
        };
        transport_1.default.sendMail(mailOptions, function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                res.status(200);
                console.log("Email Sent");
            }
        });
        return res.send(signUp).status(200);
    }
    catch (error) {
        res.status(401).json(error);
    }
});
exports.signUpUserController = signUpUserController;
// // verify user afte get mail
const verifyMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const tokens = (_a = req.query.token) === null || _a === void 0 ? void 0 : _a.toString();
        const decodedToken = jsonwebtoken_1.default.verify(tokens, env_1.Key);
        const userEmail = decodedToken.email;
        yield userModel_1.default.updateOne({ email: userEmail }, {
            $set: {
                is_Verified: true
            }
        });
        res.render("Verified");
    }
    catch (error) {
        res.status(401).json({ token: 'token Verification Failed' });
    }
});
exports.verifyMail = verifyMail;
// login user
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, userServices_1.loginUser)(req, res);
    }
    catch (error) {
        res.status(401).json("error in login User");
    }
});
exports.loginController = loginController;
