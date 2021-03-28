import pkg from 'sequelize';
const { DataTypes } = pkg;

import db from '../config/db.js'
import Region from './Region.js'
import City from './City.js'
import Suburb from './Suburb.js'

const User = db.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

User.belongsTo(Region, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
User.belongsTo(City, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
User.belongsTo(Suburb, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })


export default User