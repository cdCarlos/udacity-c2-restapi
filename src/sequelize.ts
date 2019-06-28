import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";
import { SequelizeConfig } from "sequelize-typescript/lib/types/SequelizeConfig";

const c = config.pg;

const sequelize_config: SequelizeConfig = {
  username: c.username,
  password: c.password,
  database: c.database,
  host: c.host,
  port: +c.port,
  dialect: c.dialect,
  storage: ":memory:"
};
export const sequelize = new Sequelize(sequelize_config);
