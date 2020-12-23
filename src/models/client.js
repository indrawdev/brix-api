const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Client = sequelize.define('clients', {
	client_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	client_type: {
		type: DataTypes.STRING,
		allowNull: false
	},
	client_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	client_address1: {
		type: DataTypes.STRING,
		allowNull: true
	},
	client_address2: {
		type: DataTypes.STRING,
		allowNull: true
	},
	client_phone1: {
		type: DataTypes.STRING,
		allowNull: true
	},
	client_phone2: {
		type: DataTypes.STRING,
		allowNull: true
	},
	client_website: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	tableName: 'm_clients',
	timestamps: false
})

module.exports = Client