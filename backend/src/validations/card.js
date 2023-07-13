import ValidationError from "../errors/Validation.js";

export const validateCard = (card) => {
    if(!card.content){
        throw new ValidationError('content not valid');
    }
}
