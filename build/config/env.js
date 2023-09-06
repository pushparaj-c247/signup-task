"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_URL = (_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "";
const port = 4000;
const key = 'secretkey';
exports.default = { DB_URL, port, key };
