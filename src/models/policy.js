const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Policy = sequelize.define('Policy', {
    policy_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
    tableName: 'm_policies'
})

module.exports = Policy