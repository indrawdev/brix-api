const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Delegate = sequelize.define('delegates', {
	delegate_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	off_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	delegate: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: false
	},
	created_by: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false
	},
	updated_by: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	updated_at: {
		type: DataTypes.DATE,
		allowNull: true
	}
}, {
	tableName: 't_delegates',
	timestamps: false
})

module.exports = Delegate