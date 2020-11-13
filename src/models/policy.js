const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Policy = sequelize.define('m_policies', {
    policy_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    policy_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATEONLY
    },
    expire_date: {
        type: DataTypes.DATEONLY
    }
},{
    tableName: 'm_policies',
    timestamps: false
})

module.exports = Policy