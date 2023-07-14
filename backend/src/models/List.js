import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";
import Board from "./Board.js";

class List extends Model {};

List.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        boardId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: Board,
                key: "id"
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderIndex: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            field: 'orderIndex'
        }
    },
    {
        sequelize,
        modelName: 'List',
        tableName: 'Lists',
        timestamps: false
    }
);

export default List;