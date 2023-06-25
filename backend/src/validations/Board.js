import ValidationError from "../errors/Validation.js";

export const validateBoard = (board) => {
    if(!board.title){
        throw new ValidationError('title not valid');
    }
}
