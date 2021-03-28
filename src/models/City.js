import pkg from 'sequelize';
const { DataTypes } = pkg;

import db from '../config/db.js'
import Region from './Region.js'

const City = db.define('cities', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    }, 
    city_desc: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Region.hasMany(City, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
City.belongsTo(Region, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })


export default City