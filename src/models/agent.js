const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Agent = sequelize.define('agent', {
	agent_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	agent_code: {
		type: DataTypes.STRING,
		allowNull: false
	},
	agent_name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	tableName: 'm_agents',
	timestamps: false
})

module.exports = Agent