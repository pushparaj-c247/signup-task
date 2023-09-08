"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.fromEmail = exports.emailPassword = exports.toEmail = exports.Key = exports.Port = exports.DB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_URL = (_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "";
exports.Port = process.env.Port;
exports.Key = process.env.Key;
exports.toEmail = process.env.toEmail;
exports.emailPassword = process.env.emailPassword;
exports.fromEmail = process.env.fromEmail;
exports.baseUrl = process.env.baseUrl;
