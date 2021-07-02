const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Pipeline = sequelize.define('pipelines', {
	pipeline_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	pipeline_code: {
		type: DataTypes.STRING,
		allowNull: false
	},
	company_type: {
		type: DataTypes.STRING,
		allowNull: false
	},
	company_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	business_level: {
		type: DataTypes.STRING,
		allowNull: false
	},
	head_office_address: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	contact_person: {
		type: DataTypes.STRING,
		allowNull: true
	},
	phone_number: {
		type: DataTypes.STRING,
		allowNull: true
	},
	contact_email: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	tableName: 't_pipelines',
	timestamps: false
})

module.exports = Pipeline