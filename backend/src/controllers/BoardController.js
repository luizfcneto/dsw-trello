import { boardRepository } from '../services/BoardServices.js';
import { encript } from '../services/HashServices.js';

export default { 
    async getBoardById(req, res, next){
        const id = req.params.id;

        try {
            const databaseResponse = await boardRepository.getById(id);
            if(!databaseResponse){
                //throw new UserNotFoundError("Not found");
            }

            res.status(200).json({
                board: databaseResponse
            });

        }catch(error){
            /* console.error(`${error.name} - ${error.message}`);
            if(error instanceof UserNotFoundError){
                res.status(error.statusCode).json({
                    message: "User Not Found"
                });
                return;
            } */

            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
            return;
        }
    },

    async createBoard(req, res, next) {
        let {board} = req.body;
        try{
            //validateBoard(board);
            const databaseReponse = await boardRepository.create(user);

            res.status(201).json({
                board: databaseReponse
            });

        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            /* if(error instanceof ValidationError){
                res.status(error.statusCode).json({
                    message: "Bad Request, body request is missing information"
                })
                return;
            } */
            
            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
            return;
        }
    }
}