import pkg from 'sequelize';
const { DataTypes } = pkg;


import db from '../config/db.js'

import City from './City.js'

const Suburb = db.define('suburbs', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    }, 
    sub_desc: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

City.hasMany(Suburb, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Suburb.belongsTo(City, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })


export default Suburb