import ValidationError from "../errors/Validation.js";

export const validateList = (list) => {
    if(!list.title){
        throw new ValidationError('title not valid');
    }
}
