const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Client = sequelize.define('Client', {
    client_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    client_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'm_clients'
})

module.exports = Client