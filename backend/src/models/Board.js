import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";

class Board extends Model {};

User.init(
    {
        id: {
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
        modelName: 'User',
        tableName: 'Users',
        timestamps: false
    }
);

export default User;