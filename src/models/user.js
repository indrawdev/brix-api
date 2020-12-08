const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const User = sequelize.define('users', {
    client_id: {
        type: DataTypes.INTEGER
    },
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
    user_level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE
    },
    change_pass: {
        type: DataTypes.DATE
    },
    is_active: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'm_users_client',
    timestamps: false
})

module.exports = User