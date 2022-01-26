import dotenv from 'dotenv'
dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 4000;


export const MONGODB_SERVER = process.env.MONGODB_SERVER || 'localhost';
export const MONGODB_DB     = process.env.MONGODB_DB || 'test';