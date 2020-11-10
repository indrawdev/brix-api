const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Cashless = sequelize.define('Cashless', {
    excess_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    batch_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_case: {
        type: DataTypes.DECIMAL(4)
    },
    total_excess: {
        type: DataTypes.DECIMAL(10)
    },
    total_unpaid: {
        type: DataTypes.DECIMAL(10)
    },
    total_paid: {
        type: DataTypes.DECIMAL(10)
    },
    received_date: {
        type: DataTypes.DATEONLY
    },
    followup_date: {
        type: DataTypes.DATEONLY
    },
    due_date: {
        type: DataTypes.DATEONLY
    },
    closing_at: {
        type: DataTypes.DATEONLY
    },
    is_close: {
        type: DataTypes.ENUM
    },
    is_active: {
        type: DataTypes.ENUM
    }
},{
    tableName: 't_excess'
})

module.exports = Cashless