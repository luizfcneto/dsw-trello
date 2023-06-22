import User from "../models/User.js";
import sequelize from "../../database/config.js";

export const userRepository = {
    async create(user) {
        await sequelize.sync();
        return await User.create(user);
    },

    async alreadyExists(user) {
        await sequelize.sync();
        const dbResponse = await User.findOne({ where: { email: user.email } });
        return dbResponse ? true : false;
    },

    async getById(id) {
        await sequelize.sync();
        return await User.findByPk(id);
    },

    async getByEmail(email) {
        await sequelize.sync();
        return await User.findOne({ where: { email: email } } );
    },

    async update(user) {
        await sequelize.sync();
        return await User.update(
            { attempts: user.attempts },
            { where: { user_id: user.uniqno } }
        );
    }
}