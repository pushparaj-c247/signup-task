"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = exports.passwordValidation = void 0;
const express_validator_1 = require("express-validator");
exports.passwordValidation = (0, express_validator_1.body)('password').notEmpty();
exports.emailValidation = (0, express_validator_1.body)('email').isEmail();
