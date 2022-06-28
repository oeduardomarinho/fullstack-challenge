require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE,
    host: process.env.HOST_DATABASE,
    port: process.env.PORT_DATABASE,
    dialect: process.env.DIALECT_DATABASE
  },
  test: {
    username: process.env.USERNAME_DATABASE_TEST,
    password: process.env.PASSWORD_DATABASE_TEST,
    database: process.env.DATABASE_DATABASE_TEST,
    host: process.env.HOST_DATABASE_TEST,
    port: process.env.PORT_DATABASE_TEST,
    dialect: process.env.DIALECT_DATABASE_TEST
  },
  production: {
    username: process.env.USERNAME_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE,
    host: process.env.HOST_DATABASE,
    port: process.env.PORT_DATABASE,
    dialect: process.env.DIALECT_DATABASE
  }
};
