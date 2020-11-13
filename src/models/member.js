const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Member = sequelize.define('Member', {
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