import { BCRYPT, JWT } from "../services/Hash.js";
import { userRepository } from "../services/User.js";
import { validateLogin } from "../validations/login.js";
import UserNotFoundError from "../errors/UserNotFound.js";
import SpentAllAttemptsError from "../errors/SpentAllAttempts.js";
import LoginError from "../errors/Login.js";
import { MAX_ATTEMPTS } from "../constants/login.js";

export default {
    async login(req, res, next) {
        const {login} = req.body;
        try{
            validateLogin(login);
            let userPersisted = await userRepository.getByEmail(login.email);
            if(!userPersisted){
                throw new UserNotFoundError('User not found');
            }

            if(userPersisted.getDataValue("attempts") >= 3){
                throw new SpentAllAttemptsError('Spent all attempts');
            }

            const isSamePassword = await BCRYPT.compare(login.password, userPersisted.getDataValue("password"));
            
            if(isSamePassword){
                const userJwt = JWT.create({ 
                    id: userPersisted.getDataValue("userId"), 
                    email: login.email
                });

                if(userPersisted.getDataValue("attempts") > 0){
                    userPersisted.setDataValue("attempts", 0);
                    await userRepository.update(userPersisted);
                }

                res.status(200).json({
                    user: {
                        id: userPersisted.getDataValue("userId"),
                        email: userPersisted.getDataValue("email"),
                        token: userJwt
                    }
                });
                return;

            }else {
                userPersisted.setDataValue("attempts", 1 + userPersisted.getDataValue("attempts")); 
                await userRepository.update(userPersisted);
                throw new LoginError('Unauthorized', MAX_ATTEMPTS - userPersisted.getDataValue("attempts"));
            }

        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            if(error instanceof UserNotFoundError){
                res.status(error.statusCode).json({
                    message: "User Not Found"
                });
                return;
            }
            
            if(error instanceof LoginError){
                res.status(error.statusCode).json({
                    message: `User not found, try again later... `, 
                    attemptsRemaining: error.attemptsRemaining 
                });
                return;
            }           
            
            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
        }
        
    },

    async logout(req, res, next){
        res.status(200).json({
            message: "Deslogado com sucesso"
        });
        return;
    },
}