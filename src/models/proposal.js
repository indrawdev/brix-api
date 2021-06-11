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
	file_upload: {
		type: DataTypes.STRING,
		allowNull: true
	},
	is_booking: {
		type: DataTypes.ENUM,
		values: ['0', '1']
	},
	is_document: {
		type: DataTypes.ENUM,
		values: ['0', '1']
	},
	is_screenshot: {
		type: DataTypes.ENUM,
		values: ['0', '1']
	},
	is_send: {
		type: DataTypes.ENUM,
		values: ['0', '1']
	},
	is_accept: {
		type: DataTypes.ENUM,
		values: ['0', '1']
	},
	is_action: {
		type: DataTypes.ENUM,
		values: ['N', 'R', 'C', 'L', 'W']
	},
	closing_at: {
		type: DataTypes.DATEONLY
	}
}, {
	tableName: 't_proposals',
	timestamps: false
})

module.exports = Proposal