import ValidationError from "../errors/ValidationError.js";

export const validateUser = (user) => {
    if(!user.username){
        throw new ValidationError('username not valid');
    }

    if(!validatePassword(user.password)){
        throw new ValidationError('password not valid');
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