import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Carregando informações do arquivo .env
dotenv.config();

const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE_NAME, 
    process.env.POSTGRES_DATABASE_USER, 
    process.env.POSTGRES_DATABASE_PASSWORD, 
    {
        dialect: 'postgres',
        logging: console.log,
        define: {
            charset: 'utf-8',
            collate: 'utf8_general_ci'
        }
    }
);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;