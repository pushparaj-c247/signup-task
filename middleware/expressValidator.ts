import { body, check, ValidationChain } from 'express-validator';

const isPassword = (value: string) => {
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,}$/;
    return passRegex.test(value);
};

export const validateSignupFields = [
    check('name').notEmpty().isAlpha('en-US')
        .withMessage('Name should only contain alphabetic characters'),
    check('email').notEmpty().isEmail().withMessage('Invalid Email Format'),
    body('contactNumber').optional().isNumeric().withMessage('Contact Should be Numeric')
        .isLength({ min: 10 })
        .withMessage('Contact number should be 10  digits'),
    check('password').notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password should contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password should contain at least one lowercase letter')
        .matches(/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/)
        .withMessage('Password should contain at least one special character')

];

export const passwordValidation: ValidationChain = body('password').notEmpty().isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password should contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password should contain at least one lowercase letter')
    .matches(/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/)
    .withMessage('Password should contain at least one special character');
export const emailValidation: ValidationChain = body('email').notEmpty().isEmail().withMessage('Invalid Email Format');



