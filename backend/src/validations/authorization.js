import Unauthorized from "../errors/Unauthorized.js";
import ValidationError from "../errors/Validation.js";

export const validateHeadersAuthorization = (req) => {
    if(!req?.headers){
        throw new ValidationError("Bad Request, missing information");
    }

    if(!req.headers?.authorization){
        throw new ValidationError("Bad Request, missing information");
    }

    let jwtArray = req.headers.authorization.split(" ");
    if(jwtArray.length != 2){
        throw new ValidationError("Bad Request, missing information");
    }

    return jwtArray[1];
}