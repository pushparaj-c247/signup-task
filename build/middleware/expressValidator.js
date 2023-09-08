"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = exports.passwordValidation = exports.validateSignupFields = void 0;
const express_validator_1 = require("express-validator");
const validateSignupFields = [
    (0, express_validator_1.check)('name').notEmpty().isAlpha('en-US')
        .withMessage('Name should only contain alphabetic characters'),
    (0, express_validator_1.check)('email').notEmpty().isEmail().withMessage('Invalid Email Format'),
    (0, express_validator_1.body)('contactNumber').optional().isNumeric().withMessage('Contact Should be Numeric')
        .isLength({ min: 10 })
        .withMessage('Contact number should be 10  digits'),
    (0, express_validator_1.check)('password').notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password should contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password should contain at least one lowercase letter')
        .matches(/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/)
        .withMessage('Password should contain at least one special character')
];
exports.validateSignupFields = validateSignupFields;
const passwordValidation = (0, express_validator_1.body)('password').notEmpty().isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password should contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password should contain at least one lowercase letter')
    .matches(/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/)
    .withMessage('Password should contain at least one special character');
exports.passwordValidation = passwordValidation;
const emailValidation = (0, express_validator_1.body)('email').notEmpty().isEmail().withMessage('Invalid Email Format');
exports.emailValidation = emailValidation;
