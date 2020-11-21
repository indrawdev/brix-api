const { DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Member = sequelize.define('member', {
    member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    policy_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    member_nik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    member_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    member_dob: {
        type: DataTypes.DATE
    },
    member_gender: {
        type: DataTypes.STRING,
    },
    member_marital: {
        type: DataTypes.STRING,
    },
    member_join: {
        type: DataTypes.DATEONLY
    },
    member_effective: {
        type: DataTypes.DATEONLY
    }
},{
    tableName: 'm_members',
    timestamps: false
})

module.exports = Member