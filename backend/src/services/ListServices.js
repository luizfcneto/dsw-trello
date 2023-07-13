import sequelize from "../../database/config.js";
import List from "../models/List.js";
import moment from 'moment';

export const listRepository = {
    async create(list) {
        await sequelize.sync();

        return await List.create(list);
    },
    
    async update(listId, listBody) {
        await sequelize.sync();
      
        const updatedList = {
            title: listBody.title,
            boardId: listBody.boardId,
            orderIndex: listBody.orderIndex
        };
      
        await List.update(updatedList, {
            where: { id: listId }
        });
      
        return updatedList;
    },

    async getById(listId){
        await sequelize.sync();
        return await List.findOne({
            where: { id: listId }
        });
    }
}