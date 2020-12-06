const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Reimburse = sequelize.define('reimburse', {
    claim_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    batch_code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_claim: {
        type: DataTypes.DECIMAL
    },
    total_amount: {
        type: DataTypes.DECIMAL
    },
    total_outstanding: {
        type: DataTypes.DECIMAL
    },
    total_unpaid: {
        type: DataTypes.DECIMAL
    },
    total_actual_paid: {
        type: DataTypes.DECIMAL
    },
    first_actual_paid: {
        type: DataTypes.DECIMAL
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
    },
    created_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 't_claims',
    timestamps: false
})

module.exports = Reimburse