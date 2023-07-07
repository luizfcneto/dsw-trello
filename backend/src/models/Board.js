import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";
import UserBoard from "./userBoard.js";
import User from "./User.js";

class Board extends Model {};

Board.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Board',
        tableName: 'Boards',
        timestamps: false
    });

Board.belongsToMany(User, { through: UserBoard });

export default Board;
