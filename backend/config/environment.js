require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'your_db_user',
  DB_PASSWORD: process.env.DB_PASSWORD || 'your_db_password',
  DB_NAME: process.env.DB_NAME || 'your_db_name',
  DB_PORT: process.env.DB_PORT || 5432,
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
