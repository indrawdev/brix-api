const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Formal = sequelize.define('formals', {
	formal_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	employee_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	grade: {
		type: DataTypes.STRING,
		allowNull: true
	},
	institution: {
		type: DataTypes.STRING,
		allowNull: false
	},
	majors: {
		type: DataTypes.STRING,
		allowNull: true
	},
	score: {
		type: DataTypes.DECIMAL,
		allowNull: false
	},
	start_year: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	end_year: {
		type: DataTypes.INTEGER,
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
},{
	tableName: 'm_formals',
	timestamps: false
})

module.exports = Formal