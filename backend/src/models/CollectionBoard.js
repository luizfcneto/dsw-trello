import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/config.js";
import User from "./User.js";
import Board from "./Board.js";

class CollectionBoard extends Model {};

CollectionBoard.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            field: 'userId',
            references: {
                model: User,
                key: "id"
            }
        },
        boardId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            field: 'boardId',
            references: {
                model: Board,
                key: "id"
            }
        }
    },
    {
        sequelize,
        modelName: 'CollectionBoard',
        tableName: 'CollectionBoards',
        timestamps: false
    }
);

export default CollectionBoard;