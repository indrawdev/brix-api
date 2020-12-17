const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Formal = sequelize.define('formals', {
   formal_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
   }
},{
   tableName: 'm_formals',
   timestamps: false
})

module.exports = Formal