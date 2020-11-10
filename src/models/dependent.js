const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const Dependent = sequelize.define('Dependent', {

})

module.exports = Dependent