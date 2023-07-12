import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";

class Card extends Model {};

Card.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        listId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creationDate: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        lastModifiedDate: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Card',
        tableName: 'Cards',
        timestamps: false
    }
);

export default Card;