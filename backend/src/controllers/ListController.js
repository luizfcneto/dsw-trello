import ValidationError from "../errors/Validation.js";
import { JWT } from "../services/HashServices.js";
import { listRepository } from "../services/ListServices.js";
import { validateList } from "../validations/list.js"

export default { 
    async save(req, res, next) {
        let {list} = req.body;
        const boardId = req.params.boardId;
        try{

            validateList(list);

            let boardJwt = JWT.isValid(boardId);
            const boardIdDecrypted = boardJwt.data.id;
            
            if(!list.id) {
                await listRepository.create(list, boardIdDecrypted);
            } else {
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

}