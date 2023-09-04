import { body, ValidationChain } from 'express-validator';


export const passwordValidation: ValidationChain = body('password').notEmpty();
export const emailValidation: ValidationChain = body('email').isEmail();
