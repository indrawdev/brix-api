const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Family = sequelize.define('families', {
   family_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   family_name: {
      type: DataTypes.STRING,
      allowNull: false
   }
},{
   tableName: 'm_families',
   timestamps: false
})

module.exports = Family