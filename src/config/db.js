import { Sequelize } from "sequelize";
import "dotenv/config"

const db = new Sequelize(
  process.env.DATABASE_URL, {logging: false, ssl: true}
)

export default db