const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Placing = sequelize.define('placings', {
	placing_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	request_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	proposal_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	insurance_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	placing_code: {
		type: DataTypes.STRING,
		allowNull: false
	},
	type_cover: {
		type: DataTypes.STRING,
		allowNull: false
	},
	insured_person: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	start_periode: {
		type: DataTypes.DATEONLY
	},
	end_periode: {
		type: DataTypes.DATEONLY
	},
	policy_type: {
		type: DataTypes.STRING,
		allowNull: false
	},
	policy_number: {
		type: DataTypes.STRING,
		allowNull: false
	},
	brokerage_pct: {
		type: DataTypes.DECIMAL(10)
	},
	currency: {
		type: DataTypes.STRING,
		allowNull: false
	},
	payment_term: {
		type: DataTypes.STRING,
		allowNull: false
	},
	premium_inpatient: {
		type: DataTypes.DECIMAL(10)
	},
	premium_outpatient: {
		type: DataTypes.DECIMAL(10)
	},
	premium_maternity: {
		type: DataTypes.DECIMAL(10)
	},
	premium_dental: {
		type: DataTypes.DECIMAL(10)
	},
	premium_spectacles: {
		type: DataTypes.DECIMAL(10)
	},
	policy_cost_stamp: {
		type: DataTypes.DECIMAL(10)
	},
	surcharge: {
		type: DataTypes.DECIMAL(10)
	},
	sum_insured: {
		type: DataTypes.STRING,
		allowNull: false
	},
	annual_premium_rate: {
		type: DataTypes.DECIMAL(10)
	},
	total_sum_insured: {
		type: DataTypes.DECIMAL(10)
	},
	initial_discount: {
		type: DataTypes.DECIMAL(10)
	},
	total_annual_premium: {
		type: DataTypes.DECIMAL(10)
	},
	total_brokerage: {
		type: DataTypes.DECIMAL(10)
	}
}, {
	tableName: 't_placings',
	timestamps: false
})

module.exports = Placing