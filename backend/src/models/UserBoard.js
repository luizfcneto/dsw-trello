import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";

class UserBoard extends Model {};

UserBoard.init(
  {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: "userId",
    },
    boardId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: "boardId",
    },
  },
  {
    sequelize,
    modelName: "UserBoard",
    tableName: "UserBoard",
    timestamps: false,
  }
);

export default UserBoard;