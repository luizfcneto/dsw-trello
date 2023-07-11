import {DataTypes, Model} from 'sequelize';
import sequelize from "../../database/config.js";

class Collection extends Model{};

Collection.init(
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
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Collection',
        tableName: 'Collections',
        timestamps: false
    }
);

export default Collection;