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
exports.loginUser = exports.signUpUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUpUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const create = yield userModel_1.default.create(obj);
    return create;
});
exports.signUpUser = signUpUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorResponse = {};
        for (const error of errors.array()) {
            const { path, msg } = error;
            errorResponse[path] = msg;
        }
        return res.status(400).json({ errors: errorResponse });
    }
    const { email, password } = req.body;
    const detail = yield userModel_1.default.findOne({
        email: email,
    });
    if (!detail) {
        return res.status(401).json({
            message: "invalid username & password",
        });
    }
    const passwordMatch = yield detail.validatePassword(password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "invalid password" });
    }
    const token = jsonwebtoken_1.default.sign({ email: detail.email, name: detail.name }, "ABcdefg", {
        expiresIn: "1h",
    });
    return res.status(200).json({ message: "logged in successfully", token });
});
exports.loginUser = loginUser;
