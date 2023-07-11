import sequelize from "../../database/config.js";
import BoardCollection from "../models/BoardCollection.js";

export const boardCollectionRepository = {
    async createBoardCollectionAssociation(boardId, collectionId){
        console.log("createBoardCollectionAssociation(boardId, collectionId) => ", boardId, collectionId);
        console.log("criando na tabela BoardCollection um novo registro com essas informações acima");
        await sequelize.sync();
        return await BoardCollection.create({ boardId, collectionId });
    },
}