import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    node_env: string;
    db_host: string;
    db_port: number;
    db_user_name: string;
    db_password: string;
    db_name: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    node_env: process.env.NODE_ENV || 'development',
    db_host: process.env.DB_HOST || 'localhost',
    db_port: Number(process.env.DB_PORT) || 5432,
    db_user_name: process.env.DB_USERNAME || 'postgres',
    db_password: process.env.DB_PASSWORD || 'password',
    db_name: process.env.DB_NAME || 'mydatabase',
};

export default config;