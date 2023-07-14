import sequelize from "../../database/config.js";
import Board from "../models/Board.js";
import List from "../models/List.js";
import Card from "../models/Card.js";
import BoardCollection from "../models/BoardCollection.js";
import { BCRYPT, JWT } from "./HashServices.js";
import { userBoardRepository } from "./UserBoardServices.js";
import { collectionRepository } from "./CollectionServices.js";
import { boardCollectionRepository } from "./BoardCollectionServices.js";

export const boardRepository = {
    async create(board) {
        await sequelize.sync();
        return await Board.create(board);
    },

    async getById(id) {
        await sequelize.sync();
        return await Board.findByPk(id);
    },

    async getListsByBoardId(boardId) {
        await sequelize.sync();

        return await Board.findByPk(boardId, {
        include: [
            {
                model: List,
                as: 'lists',
                include: [
                    {
                        model: Card,
                        as: 'cards'
                    }
                ]
            }]
        })
    },

    async getByUserAndTitle(board){
        await sequelize.sync();
        return await Board.findOne({
            where: { title: board.title, userId: board.userId }
        });
    },

    async remove(idBoard){
        await sequelize.sync();
        return await Board.destroy({
            where: { id: idBoard }
          });
    },

    async update(boardBody, boardId){

        console.log(boardBody.title);

        await Board.update({
            title: boardBody.title,
        }, {
            where: { id: boardId }
        });

        await sequelize.sync();
    }
}

export const generatePath = async (boardId) => {  
    const encripted = JWT.createBoardToken({ id: boardId });
    return encripted;
}

export const createBoardAndAssociations = async (board, collection) => {
    const boardCreated = await boardRepository.create(board);

    // Gerar token de pathUrl do quadro:
    boardCreated.pathUrl = await generatePath(boardCreated.id);

    await boardCreated.save();

    // Criar relação UserBoards do registro novo acima
    const userBoardRelation = await userBoardRepository.create({ userId: board.userId, boardId: boardCreated.id });
    console.log(userBoardRelation.dataValues);

    // Criar nova coleção se não existir
    const collectionFound = await collectionRepository.getCollectionByName(collection.name, boardCreated.userId);
    if(collectionFound){
        console.log("Achou uma coleção com essas informações", collection.name, boardCreated.userId);
        // Criar relação de BoardCollection
        const boardCollectionPersisted = await boardCollectionRepository.createBoardCollectionAssociation(boardCreated.id, collectionFound.id);
    }else {
        console.log("Não achou nenhuma coleção com essas informações", collection.name, boardCreated.userId);
        collection.userId = boardCreated.userId;
        const collectionCreated = await collectionRepository.createCollection(collection);
        const collectionBoardAssociated = await boardCollectionRepository.createBoardCollectionAssociation(boardCreated.id, collectionCreated.id);

    }

    return boardCreated;
}