"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const userRouter_1 = __importDefault(require("./router/userRouter"));
// import main from './mailer/nodeMailer'
const app = (0, express_1.default)();
// main
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
(0, db_1.connections)();
app.use(`/user`, userRouter_1.default);
app.set('view engine', 'ejs');
app.listen(env_1.Port, () => {
    console.log("server is started");
});
