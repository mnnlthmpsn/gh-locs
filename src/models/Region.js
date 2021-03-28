import pkg from 'sequelize';
const { DataTypes } = pkg;

import db from '../config/db.js'


const Region = db.define('regions', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    }, 
    reg_desc: {
        type: DataTypes.STRING,
        allowNull: true
    }
})


export default Region