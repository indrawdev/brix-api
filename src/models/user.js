const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const User = sequelize.define('users', {
	user_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	employee_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	ip_address: {
		type: DataTypes.STRING,
		allowNull: false
	},
	last_login: {
		type: DataTypes.DATE,
		allowNull: false
	},
	is_active: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	tableName: 'm_users',
	timestamps: false
})

module.exports = User