export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 4000;

export const MONGODB_SERVER = process.env.MONGODB_SERVER || 'localhost';
export const MONGODB_DB     = process.env.MONGODB_DB || 'test';
export const MONGODB_USER   = process.env.MONGODB_USER || '';
export const MONGODB_PASS   = process.env.MONGODB_PASS || '';