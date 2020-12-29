const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Timeoff = sequelize.define('timeoffs', {
	off_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	employee_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	type_request: {
		type: DataTypes.STRING,
		allowNull: false
	},
	effective_date: {
		type: DataTypes.DATEONLY,
		allowNull: false
	},
	note: {
		type: DataTypes.TEXT,
		allowNull: true
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
},{
	tableName: 't_times_off',
	timestamps: false
})

module.exports = Timeoff