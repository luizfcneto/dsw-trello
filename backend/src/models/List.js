import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";

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
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderIndex: {
            type: DataTypes.SMALLINT,
            allowNull: false,
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