const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Employee = sequelize.define('employees', {
   employee_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   employee_name: {
      type: DataTypes.STRING,
      allowNull: false
   },
   employee_email: {
      type: DataTypes.STRING,
      allowNull: false
   },
   employee_dept: {
      type: DataTypes.STRING,
      allowNull: false
   },
   employee_gender: {
      type: DataTypes.STRING,
      allowNull: false
   },
   employee_marital: {
      type: DataTypes.STRING,
      allowNull: false
   },
   employee_dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
   },
   employee_ext: {
      type: DataTypes.STRING,
      allowNull: false
   },
   is_head: {
      type: DataTypes.STRING,
      allowNull: false
   },
   is_active: {
      type: DataTypes.STRING,
      allowNull: false
   }
},{
   tableName: 'm_employees',
   timestamps: false
})

module.exports = Employee