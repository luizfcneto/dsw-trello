import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Carregando informações do arquivo .env
dotenv.config();

const sequelize = new Sequelize(
    process.env.POSTGRES_DB_NAME, 
    process.env.POSTGRES_DB_USER, 
    process.env.POSTGRES_DB_PASSWORD, 
    {
        dialect: 'postgres',
        logging: false,
        define: {
            charset: 'utf-8',
            collate: 'utf8_general_ci'
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;