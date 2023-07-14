import sequelize from "../../database/config.js";
import List from "../models/List.js";

export const listRepository = {
    async create(listBody, boardId) {
        await sequelize.sync();

        const incrementOrderIndexQuery = 'UPDATE "Lists" SET "orderIndex" = "orderIndex" + 1 WHERE "boardId" = ? AND "orderIndex" >= ?';
        await sequelize.query(incrementOrderIndexQuery, {
            replacements: [boardId, listBody.orderIndex],
        });

        listBody.boardId = boardId;

        return await List.create(listBody);
    },
    
    async update(listId, listBody, boardId) {
        await sequelize.sync();

        const persistedList = await this.getById(listId);
        
        const incrementOrderIndexQuery = 'UPDATE "Lists" SET "orderIndex" = "orderIndex" + 1 WHERE "boardId" = ? AND "orderIndex" >= ? AND "orderIndex" <= ?' ;
        await sequelize.query(incrementOrderIndexQuery, {
            replacements: [boardId, listBody.orderIndex, persistedList.orderIndex],
        });

        const updatedList = {
            title: listBody.title,
            boardId: boardId,
            orderIndex: listBody.orderIndex
        };
      
        await List.update(updatedList, {
            where: { id: listId }
        });
      
        return updatedList;
    },

    async remove(listId){
        await sequelize.sync();
        return await List.destroy({
            where: { id: listId }
          });
    },

    async getById(listId){
        await sequelize.sync();
        return await List.findOne({
            where: { id: listId }
        });
    }
}