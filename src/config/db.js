import { Sequelize } from "sequelize";
import "dotenv/config"

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

export default db