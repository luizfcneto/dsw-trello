import { validateEmail, validatePassword } from "./user.js";

export const validateLogin = (login) => {
    if(!validateEmail(login.email)){
        throw new Error('Email not valid');
    }

    if(!validatePassword(login.password)){
        throw new Error('Password not valid');
    }
}