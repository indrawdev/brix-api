const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Group = sequelize.define('group', {
	group_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	group_name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	tableName: 'm_groups',
	timestamps: false
})

module.exports = Group