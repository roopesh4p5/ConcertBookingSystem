import { Sequelize } from "sequelize";
import * as config from "./config";

const env = (process.env.NODE_ENV || "development") as keyof typeof config;
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database!,
  dbConfig.username!,
  dbConfig.password!,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
  }
);