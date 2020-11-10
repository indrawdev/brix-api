const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Reimburse = sequelize.define('Reimburse', {
    claim_id: {
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
        type: DataTypes.ENUM
    },
    is_active: {
        type: DataTypes.ENUM
    }
}, {
    tableName: 't_claims'
})

module.exports = Reimburse