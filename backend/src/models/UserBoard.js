import { Model, DataTypes } from "sequelize";
import sequelize from "../../database/config.js";

class UserBoard extends Model {};

const UserBoard = sequelize.define('UserBoard', {
  // Nenhuma coluna adicional necessária
});

module.exports = UserBoard;
