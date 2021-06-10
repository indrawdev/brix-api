const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Request = sequelize.define('requests', {
	request_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	pipeline_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	client_id: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	employee_id: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	request_code: {
		type: DataTypes.STRING,
		allowNull: false
	},
	business_level: {
		type: DataTypes.STRING,
		allowNull: false
	},
	business_type: {
		type: DataTypes.STRING,
		allowNull: false
	},
	type_cover: {
		type: DataTypes.STRING,
		allowNull: false
	},
	allocated_budget: {
		type: DataTypes.DECIMAL(10)
	},
	is_send: {
		type: DataTypes.ENUM
	},
	is_assign: {
		type: DataTypes.ENUM
	},
	is_approve: {
		type: DataTypes.ENUM
	}
}, {
	tableName: 't_requests',
	timestamps: false
})

module.exports = Request