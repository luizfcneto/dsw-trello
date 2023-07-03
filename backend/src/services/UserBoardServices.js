import UserBoard from "../models/userBoard.js";
import sequelize from "../../database/config.js";

export const userBoardRepository = {
    async post(userBoard) {
        await sequelize.sync();
        return await UserBoard.create(userBoard);
    },

    async findAll(userId) {
        await sequelize.sync();
        return await UserBoard.findAll(userId);
    },
}