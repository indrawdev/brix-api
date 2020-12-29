const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const File = sequelize.define('files', {
	file_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	employee_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	file_type: {
		type: DataTypes.STRING,
		allowNull: false
	},
	file_description: {
		type: DataTypes.STRING,
		allowNull: true
	},
	file_upload: {
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
},{
	tableName: 'm_files',
	timestamps: false
})

module.exports = File