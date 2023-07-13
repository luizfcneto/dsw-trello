import ValidationError from "../errors/Validation.js";
import { listRepository } from "../services/ListServices.js";
import { validateList } from "../validations/list.js"

export default { 
    async save(req, res, next) {
        let {list} = req.body;
        const listId = req.params.listId;
        try{

            validateList(list);
            
            console.log(!listId);
            console.log(listId);
            if(!listId) {
                await listRepository.create(list);
            } else {
                await listRepository.update(listId, list);
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