const { DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Insurance = sequelize.define('insurances', {
    insurance_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    insurance_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    insurance_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'm_insurances',
    timestamps: false
})

module.exports = Insurance