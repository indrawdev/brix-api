const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Bank = sequelize.define('bank', {
	bank_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	bank_code: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	bank_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	bank_abbr: {
		type: DataTypes.STRING,
		allowNull: false,
	}
}, {
	tableName: 'm_banks',
	timestamps: false
})

module.exports = Bank