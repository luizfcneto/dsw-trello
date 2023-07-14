import ValidationError from "../errors/Validation.js";
import { cardRepository } from "../services/CardServices.js";
import { validateCard } from "../validations/card.js"

export default { 
    async save(req, res, next) {
        console.log("CardController.save() executed");
        let {card} = req.body;
        const cardId = req.params.cardId;
        console.log(card);
        console.log(req.body);
        try{

            validateCard(card);
            
            if(!cardId) {
                console.log("criar card novo");
                await cardRepository.create(card);
            } else {
                console.log("atualizar card");
                await cardRepository.update(cardId, card);
            }
            
            res.status(201).json({
                card: "Card saved",
            });
            
        }catch(error){
            console.error(`${error.name} - ${error.message}`);
            if(error instanceof ValidationError){
                res.status(error.statusCode).json({
                    message: "Content is not valid"
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
        console.log("remove executed");
        const cardId = req.params.cardId;
        console.log(cardId);
        try{
            // Remove lista
            await cardRepository.remove(cardId);
            
            res.status(200).json({
                message: "Card removed",
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