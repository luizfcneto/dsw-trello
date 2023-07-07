import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";
import User from "./User.js";
import Board from "./Board.js";

class UserBoard extends Model {};

UserBoard.init({ 
        id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        userId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            field: 'user_id'
        },
        boardId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            field: 'board_id'
        }
    },
    {
        sequelize,
        modelName: 'UserBoard',
        tableName: 'UserBoard',
        timestamps: false
    }
);

UserBoard.belongsToMany(Board, { through: UserBoard });
UserBoard.belongsToMany(User, { through: UserBoard });

export default UserBoard;