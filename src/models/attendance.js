const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Attendance = sequelize.define('attendance', {
	attendance_id: {
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
	attendance_status: {
		type: DataTypes.STRING,
		allowNull: false
	},
	approval_by: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	approval_at: {
		type: DataTypes.DATEONLY
	},
	long: {
		type: DataTypes.STRING,
		allowNull: true
	},
	latt: {
		type: DataTypes.STRING,
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
}, {
	tableName: 't_times_attendance',
	timestamps: false
})

module.exports = Attendance