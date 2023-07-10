import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";
import Board from "./Board.js";
import User from "./User.js";

class UserBoard extends Model {};

UserBoard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "userId",
      references: {
        model: User,
        key: "id",
      },
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "boardId",
      references: {
        model: Board,
        key: "id",
      },
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