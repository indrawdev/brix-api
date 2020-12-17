const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Experience = sequelize.define('experiences', {
   experience_id: {
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
   tableName: 'm_experiences',
   timestamps: false
})

module.exports = Experience