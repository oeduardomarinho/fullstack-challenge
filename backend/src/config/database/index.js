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
