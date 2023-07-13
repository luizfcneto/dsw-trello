import BoardNotFoundError from '../errors/BoardNotFound.js';
import ValidationError from '../errors/Validation.js';
import BoardAlreadyExistsError from '../errors/BordAlreadyExists.js';
import { validateBoard } from '../validations/board.js';
import { validateCollection } from '../validations/collection.js';
import { boardRepository, createBoardAndAssociations } from '../services/BoardServices.js';
import jwt from 'jsonwebtoken';

export default { 
    async getListsByBoardId(req, res, next){
        const boardId = req.params.boardId;
        try {
            let boardJwt = jwt.verify(boardId);
            console.log(boardJwt);
            const boardIdDecrypted = boardJwt.boardId;

            const databaseResponse = await boardRepository.getListsByBoardId(boardIdDecrypted);
            if(!databaseResponse){
                throw new BoardNotFoundError("Not found");
            }

            res.status(200).json({
                board: databaseResponse
            });

        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            if(error instanceof BoardNotFoundError){
                res.status(error.statusCode).json({
                    message: "Board Not Found"
                });
                return;
            }

            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
            return;
        }
    },

    async createBoard(req, res, next) {
        let {board} = req.body;
        let {collection} = req.body;
        board.userId = req.headers.userId;
        try{
            validateBoard(board);
            validateCollection(collection);

            const boardAlreadyExists = await boardRepository.getByUserAndTitle(board);
            if(boardAlreadyExists){
                throw new BoardAlreadyExistsError('Cannot be persisted with same title');
            }

            // Criar quadro
            const boardCreated = await createBoardAndAssociations(board, collection);
            
            res.status(201).json({
                board: boardCreated,
            });
            
        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            if(error instanceof ValidationError){
                res.status(error.statusCode).json({
                    message: "Bad Request, body request is missing information"
                })
                return;
            }

            if(error instanceof BoardAlreadyExistsError){
                res.status(error.statusCode).json({
                    message: error.message
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