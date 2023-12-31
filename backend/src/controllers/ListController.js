import ValidationError from "../errors/Validation.js";
import { JWT } from "../services/HashServices.js";
import { listRepository } from "../services/ListServices.js";
import { validateList } from "../validations/list.js"

export default { 
    async save(req, res, next) {
        console.log("ListController.save() executed");
        let {list} = req.body;
        const boardId = req.params.boardId;
        console.log(list);
        try{

            validateList(list);

            let boardJwt = JWT.isValid(boardId);
            const boardIdDecrypted = boardJwt.data.id;
            
            if(!list.id) {
                console.log("Criar lista:" );
                await listRepository.create(list, boardIdDecrypted);
            } else {
                console.log("Atualizar Lista");
                await listRepository.update(list.id, list, boardIdDecrypted);
            }
            
            res.status(201).json({
                list: "List saved",
            });
            
        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            if(error instanceof ValidationError){
                res.status(error.statusCode).json({
                    message: "Title is not valid"
                })
                return;
            }

            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
            return;
        }
    },

    async remove(req, res, next) {
        console.log("ListController.remove() executed");
        const listId = req.params.listId;
        console.log(listId);
        try{
            // Remove lista
            await listRepository.remove(listId);
            
            res.status(200).json({
                message: "List removed",
            });
            
        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            if(error instanceof ValidationError){
                res.status(error.statusCode).json({
                    message: "Bad Request, body request is missing information"
                })
                return;
            }

            res.status(500).json({
                message: "Something went wrong, try again later..."
            });
            return;
        }
    }

}