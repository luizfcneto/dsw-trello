import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/config.js";
import Board from "./Board.js";
import Collection from "./Collection.js";

class BoardCollection extends Model {};

BoardCollection.init(
    {
        boardId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            field: 'boardId',
            references: {
                model: Board,
                key: 'id'
            }
        },
        collectionId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            field: 'collectionId',
            references: {
                model: Collection,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: "BoardCollection",
        tableName: "BoardCollections",
        timestamps: false
    }
)

export default BoardCollection;