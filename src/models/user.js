const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const User = sequelize.define('User', {
    userclient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userclient_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userclient_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userclient_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE
    },
    is_active: {
        type: DataTypes.ENUM
    }
})

module.exports = User