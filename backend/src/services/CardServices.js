import sequelize from "../../database/config.js";
import Card from "../models/Card.js";
import moment from 'moment';

export const cardRepository = {
    async create(card) {
        await sequelize.sync();

        card.lastModifiedDate = moment().format('DD/MM/YYYY');
        card.creationDate = moment().format('DD/MM/YYYY');

        return await Card.create(card);
    },

    async update(cardId, cardBody) {
        await sequelize.sync();
      
        const updatedCard = {
            content: cardBody.content,
            listId: cardBody.listId,
            lastModifiedDate: moment().format('DD/MM/YYYY')
        };
      
        await Card.update(updatedCard, {
            where: { id: cardId }
        });
      
        return updatedCard;
    },

    async remove(cardId){
        await sequelize.sync();
        return await Card.destroy({
            where: { id: cardId }
          });
    },

    async getById(cardId){
        await sequelize.sync();
        return await Card.findOne({
            where: { id: cardId }
        });
    }
}