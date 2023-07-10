import User from "./User.js";
import Board from "./Board.js";
import UserBoard from "./UserBoard.js";
import CollectionBoard from "./CollectionBoard.js";

export const databaseAssociations = async () => {
    
    // usuário possui muitos quadros
    User.belongsToMany(Board, {
        through: UserBoard,
        foreignKey: 'userId',
        otherKey: 'boardId',
        as: 'boards'
    });

    // quadro possui muitos membros
    Board.belongsToMany(User, {
        through: UserBoard,
        foreignKey: 'boardId',
        otherKey: 'userId',
        as: 'users'
    });


    // User possui muitas collections:
    User.hasMany(CollectionBoard, {
        foreignKey: "userId",
        as: "collections", // Alias para a associação
    });

    await User.sync();
    await Board.sync();
    await UserBoard.sync();
}