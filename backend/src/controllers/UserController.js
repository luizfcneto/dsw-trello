import { validateUser } from '../validations/user.js';
import { userRepository } from '../services/UserServices.js';
import ValidationError from '../errors/Validation.js';
import UserAlreadyExistsError from '../errors/UserAlreadyExists.js';
import UserNotFoundError from '../errors/UserNotFound.js';
import SpentAllAttemptsError from "../errors/SpentAllAttempts.js";
import { BCRYPT, JWT } from '../services/HashServices.js';
import { validateLogin } from '../validations/login.js';
import { MAX_ATTEMPTS } from "../constants/login.js";
import LoginError from "../errors/Login.js"; 

export default { 
    async getUserById(req, res, next){
        const id = req.params.id;

        try {
            const databaseResponse = await userRepository.getById(id);
            if(!databaseResponse){
                throw new UserNotFoundError("Not found");
            }

            res.status(200).json({
                user: databaseResponse
            });

        }catch(error){
            console.error(`${error.name} - ${error.message}`);
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
    },

    async createUser(req, res, next) {
        console.log("Executando o método para criar usuário", req.body);
        let {user} = req.body;
        try{
            validateUser(user);
            const userAlreadyExists = await userRepository.alreadyExists(user);
            if(userAlreadyExists){
                throw new UserAlreadyExistsError("Cannot be persisted with the same email");
            }
            user.password = await BCRYPT.encript(user.password);
            user.attempts = user?.attempts ? user.attempts : 0; 
            const databaseReponse = await userRepository.create(user);

            res.status(201).json({
                user: databaseReponse
            });

        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            if(error instanceof ValidationError){
                res.status(error.statusCode).json({
                    message: "Bad Request, body request is missing information"
                })
                return;
            }
            
            if(error instanceof UserAlreadyExistsError){
                res.status(error.statusCode).json({
                    message: "User already exists."
                });
                return;
            }
            
            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
            return;
        }
    },

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
                    id: userPersisted.getDataValue("id"), 
                    email: login.email
                });

                if(userPersisted.getDataValue("attempts") > 0){
                    userPersisted.setDataValue("attempts", 0);
                    await userRepository.update(userPersisted);
                }

                res.status(200).json({
                    user: {
                        id: userPersisted.getDataValue("id"),
                        email: userPersisted.getDataValue("email"),
                        token: userJwt
                    }
                });
                return;

            }else {
                userPersisted.setDataValue("attempts", 1 + userPersisted.getDataValue("attempts")); 
                await userRepository.update(userPersisted);
                throw new LoginError('Bad Credentials', MAX_ATTEMPTS - userPersisted.getDataValue("attempts"));
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
        console.log(req.headers.authorization);
        res.status(200).json({
            message: "Deslogado com sucesso"
        });
        return;
    },
}
