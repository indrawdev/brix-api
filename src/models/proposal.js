const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Proposal = sequelize.define('proposals', {
	proposal_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	request_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	document_name: {
		type: DataTypes.STRING,
		allowNull: true
	},
	file_upload: {
		type: DataTypes.STRING,
		allowNull: true
	},
	is_booking: {
		type: DataTypes.ENUM
	},
	is_document: {
		type: DataTypes.ENUM
	},
	is_screenshot: {
		type: DataTypes.ENUM
	},
	is_send: {
		type: DataTypes.ENUM
	},
	is_accept: {
		type: DataTypes.ENUM
	},
	is_action: {
		type: DataTypes.ENUM
	},
	closing_at: {
		type: DataTypes.DATEONLY
	}
}, {
	tableName: 't_proposals',
	timestamps: false
})

module.exports = Proposal