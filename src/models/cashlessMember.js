const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const CashlessMember = sequelize.define('cashless_member', {
	batch_code: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	member_id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	member_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	unpaid: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
	paid: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	action: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	created_by: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	created_at: {
		type: DataTypes.DATE
	}
},{
	tableName: 't_excess_detail_test',
	timestamps: false
})

module.exports = CashlessMember