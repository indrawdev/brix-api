const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Informal = sequelize.define('informals', {
   informal_id: {
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
   tableName: 'm_informals',
   timestamps: false
})

module.exports = Informal