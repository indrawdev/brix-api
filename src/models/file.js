const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const File = sequelize.define('files', {
   file_id: {
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
   tableName: 'm_files',
   timestamps: false
})

module.exports = File