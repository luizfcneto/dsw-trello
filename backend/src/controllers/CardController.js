import ValidationError from "../errors/Validation.js";
import { cardRepository } from "../services/CardServices.js";
import { validateCard } from "../validations/card.js"

export default { 
    async save(req, res, next) {
        let {card} = req.body;
        const cardId = req.params.cardId;
        try{

            validateCard(card);
            
            if(!cardId) {
                await cardRepository.create(card);
            } else {
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

}