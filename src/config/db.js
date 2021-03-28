import { Sequelize } from "sequelize";

const db = new Sequelize(
  "postgres://devAdmin:devAdmin@localhost:5432/addressBookDB", {logging: false}
)

export default db