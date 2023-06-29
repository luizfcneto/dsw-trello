import Board from "../models/Board.js";
import sequelize from "../../database/config.js";

export const BoardRepository = {
    async create(board) {
        await sequelize.sync();
        return await Board.create(board);
    },

    async getById(id) {
        await sequelize.sync();
        return await Board.findByPk(id);
    },
}