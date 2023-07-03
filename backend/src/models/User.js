import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";
import Board from "./Board.js";

class User extends Model {};

User.init(
    {
        userId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'user_id'
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recoveryToken: {
            type: DataTypes.STRING,
            field: 'recovery_token'
        },
        attempts: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: false
    },

    User.hasMany(Board, {
        foreignKey: "user_id",
        sourceKey: "userId",
        as: "boards"
    })
);

export default User;
