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
   },
   company_name: {
      type: DataTypes.STRING,
      allowNull: false
   },
   job_position: {
      type: DataTypes.STRING,
      allowNull: false
   },
   from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
   },
   to_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
   },
   created_by: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   created_at: {
      type: DataTypes.DATE,
      allowNull: false
   },
   updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
   },
   updated_at: {
      type: DataTypes.DATE,
      allowNull: true
   }
},{
   tableName: 'm_experiences',
   timestamps: false
})

module.exports = Experience