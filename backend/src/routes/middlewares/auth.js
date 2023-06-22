import { JWT } from "../../services/Hash.js";
import { validateHeadersAuthorization } from "../../validations/authorization.js"
import ValidationError from "../../errors/Validation.js";
import jwt from "jsonwebtoken";


export const protectedEndpoint = async (req, res, next) => {
    // Validar campo headers.authorization do objeto request:
    try{
        const requestJwt = validateHeadersAuthorization(req);  
        const {data} = JWT.isValid(requestJwt);

    } catch(error){
        console.error(`${error.name} - ${error.message}`);
        if(error instanceof ValidationError){
            res.status(error.statusCode).json({
                message: "Bad Request, missing information"
            });
            return;
        }

        if(error instanceof jwt.TokenExpiredError){
            res.status(401).json({
                message: "Unauthorized - JWT is expired"
            });
            return;
        }

        res.status(500).json({
            message: "Something went wrong, try again later..."
        });
        return;
    }
    next();
}