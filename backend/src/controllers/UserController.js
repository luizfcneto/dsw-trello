import { validatePasswordChange, validateUser } from '../validations/user.js';
import { userRepository } from '../services/UserServices.js';
import ValidationError from '../errors/Validation.js';
import UserAlreadyExistsError from '../errors/UserAlreadyExists.js';
import UserNotFoundError from '../errors/UserNotFound.js';
import PasswordsDontMatch from '../errors/PasswordsDontMatch.js';
import SpentAllAttemptsError from "../errors/SpentAllAttempts.js";
import { BCRYPT, JWT } from '../services/HashServices.js';
import { validateLogin } from '../validations/login.js';
import { validateRecoverPassword } from '../validations/user.js';
import { MAX_ATTEMPTS } from "../constants/login.js";
import LoginError from "../errors/Login.js"; 
import jwt from "jsonwebtoken";

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

    async getUserByToken(req, res, next) {
        console.log("getUserByToken executed");
        const token = req.headers.authorization.split(" ")[1];
        const payload = JWT.isValid(token);
        try{
            const databaseResponse = await userRepository.getByEmail(payload.data.email);
            if(databaseResponse instanceof Error){
                throw new UserNotFoundError('User not found');
            }

            res.status(200).json({
                user: {
                    username: databaseResponse.username,
                    email: databaseResponse.email,
                }
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
        }
    },

    async createUser(req, res, next) {
        console.log("Executando o método para criar usuário", req.body);
        let {user} = req.body;
        try{
            console.log(user);
            validateUser(user);
            const userAlreadyExists = await userRepository.alreadyExists(user);
            if(userAlreadyExists){
                throw new UserAlreadyExistsError("Cannot be persisted with same email");
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

            if(error instanceof PasswordsDontMatch){
                res.status(error.statusCode).json({
                    message: "Passwords dont match."
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
                const userJwt = JWT.createUserToken({ 
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

    async recoverPassword(req, res, next) {
        const {recoverPassword} = req.body;
        try{
            validateRecoverPassword(recoverPassword);
            let userPersisted = await userRepository.getByEmail(recoverPassword.email);
            
            if(!userPersisted){
                throw new UserNotFoundError('User not found');
            }
            
            let recoveryToken = userPersisted.getDataValue('recoveryToken');

            if (!recoveryToken || !JWT.isValid(recoveryToken)) {
                // Se não houver um token ou se estiver expirado, gera um novo JWT
                const token = JWT.createRecoveryToken({ 
                    id: userPersisted.getDataValue("id"), 
                    email: recoverPassword.email
                });
                // Atualize o recoveryToken no banco de dados
                userPersisted = await userRepository.updateRecoveryToken(userPersisted.id, token);
            } 
            
            res.status(200).json({
                user: {
                    recoveryToken: userPersisted.recoveryToken
                },
            });
            return;
        } catch(error) {
            if(error instanceof UserNotFoundError) {
                res.status(error.statusCode).json({
                    message: "User Not Found"
                });
                return; 
            }

            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
        }
    },

    async savePassword(req, res, next) {
        let {recoverPassword} = req.body;
        try{
            validatePasswordChange(recoverPassword.password, recoverPassword.confirmPassword, recoverPassword.recoveryToken);
            
            let userPersisted = await userRepository.getByRecoveryToken(recoverPassword.recoveryToken);
            
            //salva a nova senha
            userPersisted.password = await BCRYPT.encript(recoverPassword.password);
            userPersisted.save();

            res.status(201).json({
                message: "The password was updated"
            });

        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            if(error instanceof ValidationError){
                res.status(error.statusCode).json({
                    message: "Bad Request, body request is missing information"
                })
                return;
            }
            
            if(error instanceof jwt.TokenExpiredError){
                res.status(401).json({
                    message: "Unauthorized - JWT is expired"
                });
                return;
            }

            if(error instanceof PasswordsDontMatch){
                res.status(error.statusCode).json({
                    message: "Passwords dont match."
                });
                return;
            }
            
            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
            return;
        }
    },
}
