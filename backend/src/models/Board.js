import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";

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
    },
    {
        sequelize,
        modelName: 'Board',
        tableName: 'Boards',
        timestamps: false
    }
);

export default Board;