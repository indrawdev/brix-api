const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Cashless = sequelize.define('t_excess', {
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
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.STRING
    }
},{
    tableName: 't_excess',
    timestamps: false
})

module.exports = Cashless