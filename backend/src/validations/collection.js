import ValidationError from "../errors/Validation.js";

export const validateCollection = (collection) => {
    if(!collection.name){
        throw new ValidationError('Missing information of collection');
    }
}