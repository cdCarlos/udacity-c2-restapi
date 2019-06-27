import { Sequelize } from 'sequelize-typescript';
import { config } from './config/config';


const c = config.pg;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.username,
  "password": c.password,
  "database": c.database,
  "host": c.host,
  "port": c.port,

  dialect: c.dialect,
  storage: ':memory:',
});

