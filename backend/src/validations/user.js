import ValidationError from "../errors/Validation.js";
import PasswordsDontMatch from "../errors/PasswordsDontMatch.js";
import { JWT } from '../services/HashServices.js'
import jwt from "jsonwebtoken";

export const validateUser = (user) => {
    if(!user.username){
        throw new ValidationError('username not valid');
    }

    if(!validatePassword(user.password)){
        throw new ValidationError('password not valid');
    }

    if(!validatePasswordAndConfirmPassword(user.password, user.confirmPassword)){
        throw  new PasswordsDontMatch('passwords dont match');
    }

    if(!validateEmail(user.email)){
        throw new ValidationError('email not valid');
    }
}

export const validateEmail = (email) => {
    if(!email){
        return false;
    }

    return /^[A-Za-z0-9._%-]+@([A-Za-z0-9-].)+[A-Za-z]{2,4}$/.test(email);
}

export const validatePassword = (password) => {
    if(!password){
        return false;
    }

    if(password.length < 8){
        return false;
    }

    return /.*[a-zA-Z].*$/.test(password) && /.*[0-9].*$/.test(password);
}

export const validatePasswordChange = (password, confirmPassword, recoveryToken) => {
    if(validatePasswordAndConfirmPassword(password, confirmPassword)){
        throw new PasswordsDontMatch('passwords dont match');
    }

    validatePassword(password);
    if(!JWT.isValid(recoveryToken)) {
        throw new jwt.TokenExpiredError("JWT is expired");
    }

    return true;
}

export const validateRecoverPassword = (recoverPassword) => {
    if(!validateEmail(recoverPassword.email)){
        throw new Error('Email not valid');
    }
}

export const validatePasswordAndConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
}