const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Reference = sequelize.define('reference', {
	reference_group: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	reference_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	reference_value: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	}
}, {
	tableName: 'm_references',
	timestamps: false
})

module.exports = Reference