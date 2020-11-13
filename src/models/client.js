const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Client = sequelize.define('m_clients', {
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
    tableName: 'm_clients',
    timestamps: false
})

module.exports = Client