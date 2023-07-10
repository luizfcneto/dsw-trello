import sequelize from "../../database/config.js";
import Board from "../models/Board.js";

export const boardRepository = {
    async create(board) {
        await sequelize.sync();
        return await Board.create(board);
    },

    async getById(id) {
        await sequelize.sync();
        return await Board.findByPk(id);
    },
}