const { DataTypes } = require('sequelize')

const sequelize = require('../config/database')

const Contact = sequelize.define('contacts', {
   contact_id: {
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
   tableName: 'm_contacts',
   timestamps: false
})

module.exports = Contact