const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const ReimburseMember = sequelize.define('reimburse_member', {
    batch_code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    member_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    member_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    outstanding: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unpaid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE
    }
},{
    tableName: 't_claims_detail_test',
    timestamps: false
})

module.exports = ReimburseMember