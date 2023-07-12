import User from "./User.js";
import Board from "./Board.js";
import UserBoard from "./UserBoard.js";
import Collection from "./Collection.js";
import BoardCollection from './BoardCollection.js';
import Card from "./Card.js";
import List from "./List.js";

export const databaseAssociations = async () => {
    
    // User Associations:
    User.belongsToMany(Board, {
        through: UserBoard,
        foreignKey: 'userId',
        otherKey: 'boardId',
        as: 'boards'
    });

    User.hasMany(Collection, {
        foreignKey: 'userId',
        as: 'collections'
    });


    // Boards Associations:
    Board.belongsToMany(User, {
        through: UserBoard,
        foreignKey: 'boardId',
        otherKey: 'userId',
        as: 'users'
    });

      
    Board.belongsToMany(Collection, {
        through: 'BoardCollection',
        foreignKey: 'boardId',
        otherKey: 'collectionId',
        as: 'collections'
    });


    // UserBoard Associations:
    UserBoard.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    });
      
    UserBoard.belongsTo(Board, {
        foreignKey: 'boardId',
        as: 'board'
    });


    // Collection Associations:
    Collection.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    });
      
    Collection.belongsToMany(Board, {
        through: 'BoardCollection',
        foreignKey: 'collectionId',
        otherKey: 'boardId',
        as: 'boards'
    });


    // Board Collections Associations:
    BoardCollection.belongsTo(Board, {
        foreignKey: 'boardId',
        as: 'board'
    });
      
    BoardCollection.belongsTo(Collection, {
        foreignKey: 'collectionId',
        as: 'collection'
    });
      
    // List associations:
    List.hasMany(Card, {
        foreignKey: 'list_id',
        as: 'cards'
    });

    List.belongsTo(Board, {
        foreignKey: 'board_id',
        as: 'board'
    });

    // Card associations
    Card.belongsTo(List, {
        foreignKey: 'list_id',
        as: 'list'
    });

    await User.sync();
    await Board.sync();
    await Collection.sync();
    await UserBoard.sync();
    await BoardCollection.sync();
    await List.sync();
    await Card.sync();
}