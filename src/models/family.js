const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Family = sequelize.define('families', {
	family_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	employee_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	family_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	family_relation: {
		type: DataTypes.STRING,
		allowNull: false
	},
	family_dob: {
		type: DataTypes.DATEONLY,
		allowNull: false
	},
	family_marital: {
		type: DataTypes.STRING,
		allowNull: false
	},
	family_gender: {
		type: DataTypes.STRING,
		allowNull: false
	},
	family_religion: {
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
},{
	tableName: 'm_families',
	timestamps: false
})

module.exports = Family