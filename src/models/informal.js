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
   },
   education: {
      type: DataTypes.STRING,
      allowNull: true
   },
   held_by: {
      type: DataTypes.STRING,
      allowNull: true
   },
   start_date: {
      type: DataTypes.DATEONLY
   },
   end_date: {
      type: DataTypes.DATEONLY
   },
   duration_type: {
      type: DataTypes.STRING,
      allowNull: true
   },
   fee: {
      type: DataTypes.DECIMAL,
      allowNull: false
   },
   description: {
      type: DataTypes.STRING,
      allowNull: true
   },
   attach_file: {
      type: DataTypes.STRING,
      allowNull: true
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
   tableName: 'm_informals',
   timestamps: false
})

module.exports = Informal