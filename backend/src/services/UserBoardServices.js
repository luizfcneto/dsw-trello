import sequelize from "../../database/config.js";
import User from "../models/User.js";
import Board from "../models/Board.js";
import UserBoard from "../models/UserBoard.js";
import Collection from "../models/Collection.js";


export const userBoardRepository = {
    async create(userBoard) {
        await sequelize.sync();
        return await UserBoard.create(userBoard);
    },

    async findAll(userId) {
        await sequelize.sync();
        return await UserBoard.findAll({
            where: { userId: userId },
        });
    },

    async getAllBoardsOfUser(userId) {
        await sequelize.sync();
        return await User.findByPk(userId, {
            include: [
                {
                    model: Board,
                    through: {
                        model: UserBoard
                    },
                    as: 'boards'
                }
            ]
        })
    },

    async getAllUserCollectionsBoards(userId){
        await sequelize.sync();
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Collection,
                    as: 'collections',
                    include: [
                        {
                            model: Board,
                            as: 'boards'
                        }
                    ]
                }
            ]
        });

        return user;
    }
}