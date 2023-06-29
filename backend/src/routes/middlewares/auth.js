import { JWT } from "../../services/HashServices.js";
import { validateHeadersAuthorization } from "../../validations/authorization.js"
import ValidationError from "../../errors/Validation.js";
import jwt from "jsonwebtoken";
import { userRepository } from "../../services/UserServices.js";
import UserNotFoundError from "../../errors/UserNotFound.js";

export const protectedEndpoint = async (req, res, next) => {
    console.log("Executing protectedEndpoint");
    try{
        const requestJwt = validateHeadersAuthorization(req);  
        const {data} = JWT.isValid(requestJwt);
        
        // Verificar se data.email pertence de fato a data.id:
        const userId = await userRepository.getById(data.id);
        if(!userId){
            throw new UserNotFoundError("User not found");
        }

        if(userId.getDataValue("email") !== data.email){
            throw new UserNotFoundError("Unauthorized - claims id and email not matching");
        }

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

        if(error instanceof UserNotFoundError){
            res.status(error.statusCode).json({
                message: "User Not Found"
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