import sequelize from "../../database/config.js"
import Collection from "../models/Collection.js";


export const collectionRepository = {
    async getCollectionByName(name, userId) {
        console.log("getCollectionByName(name, userId) => ", name, userId);
        console.log("procurando coleção com este nome e com este userId");
        await sequelize.sync();
        return await Collection.findOne({
            where: { name: name, userId: userId }
        });
    },

    async createCollection(collection){
        console.log(`Criando uma nova coleção nome: ${collection.name} e userId: ${collection.userId}`);
        await sequelize.sync();
        return await Collection.create(collection);
    }
}