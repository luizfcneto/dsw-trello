import { validateUser } from '../validations/userValidations.js';
import { userRepository } from '../services/UserServices.js';
import ValidationError from '../errors/ValidationError.js';
import UserAlreadyExistsError from '../errors/UserAlreadyExistsError.js';
import UserNotFoundError from '../errors/UserNotFoundError.js';
import { encript } from '../services/HashServices.js';

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
        let {user} = req.body;
        try{
            validateUser(user);
            const userAlreadyExists = await userRepository.alreadyExists(user);
            if(userAlreadyExists){
                throw new UserAlreadyExistsError("Cannot be persisted with the same email");
            }
            user.password = await encript(user.password); 
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
    }
}
