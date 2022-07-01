import Sequelize from 'sequelize';
import * as sequelizeOptions from '../../../.sequelizerc';
import { Umzug, SequelizeStorage } from 'umzug';
import logger from '../logger';

import dotenv from 'dotenv';
dotenv.config();

export { DataTypes } from 'sequelize';

let DATABASE = process.env.DATABASE;
let USERNAME = process.env.USERNAME_DATABASE;
let PASSWORD = process.env.PASSWORD_DATABASE;
let HOST = process.env.HOST_DATABASE;
let PORT = process.env.PORT_DATABASE;
let DIALECT = process.env.DIALECT_DATABASE;

if (process.env.NODE_ENV === 'test') {
  DATABASE = process.env.DATABASE_TEST;
  USERNAME = process.env.USERNAME_DATABASE_TEST;
  PASSWORD = process.env.PASSWORD_DATABASE_TEST;
  HOST = process.env.HOST_DATABASE_TEST;
  PORT = process.env.PORT_DATABASE_TEST;
  DIALECT = process.env.DIALECT_DATABASE_TEST;
}
/**
 * @type {Sequelize} sequelize - sequelize instance
 */
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const migrations = new Umzug({
  migrations: {
    glob: ['*.js', { cwd: sequelizeOptions['migrations-path'] }]
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger
});

const seeders = new Umzug({
  migrations: {
    glob: ['*.js', { cwd: sequelizeOptions['seeders-path'] }]
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger
});

(() =>
  sequelize
    .sync({ force: process.env.NODE_ENV !== 'production' })
    .then(() => migrations.up())
    .then(() => process.env.NODE_ENV !== 'production' && seeders.up())
    .catch((error) => {
      logger.error('Could not connect to the database.', error);
    }))();

export const cleanUp = () => {
  if (process.env.NODE_ENV !== 'production') {
    return sequelize
      .sync({ force: true })
      .then(() => seeders.down())
      .then(() => migrations.down())
      .then(() => migrations.up())
      .catch((error) => {
        logger.error('Could not connect to the database.', error);
      });
  }
};

export const reSeed = () => {
  if (process.env.NODE_ENV !== 'production') {
    return sequelize
      .sync({ force: true })
      .then(() => seeders.down())
      .then(() => seeders.up())
      .catch((error) => {
        logger.error('Could not connect to the database.', error);
      });
  }
};

export const migrate = () => {
  if (process.env.NODE_ENV !== 'production') {
    return sequelize
      .sync({ force: true })
      .then(() => seeders.down())
      .then(() => migrations.down())
      .then(() => migrations.up())
      .then(() => seeders.up())
      .catch((error) => {
        logger.error('Could not connect to the database.', error);
      });
  }
};

export default sequelize;
