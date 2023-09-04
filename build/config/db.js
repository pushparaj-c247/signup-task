"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connections = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connections() {
    mongoose_1.default
        .connect('mongodb://127.0.0.1:27017/SignUp')
        .then(() => console.log("DB connected "))
        .catch(() => console.log("error in DB"));
}
exports.connections = connections;
