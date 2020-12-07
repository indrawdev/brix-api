const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Counter = sequelize.define('counters', {
   counter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
   },
   counter_type: {
      type: DataTypes.STRING,
      allowNull: false
   },
   counter_prefix: {
      type: DataTypes.STRING,
      allowNull: false
   },
   counter_value: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {
   tableName: 'm_counters_test',
   timestamps: false
})

module.exports = Counter