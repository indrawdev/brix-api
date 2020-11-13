const Sequelize = require('sequelize')

const sequelize = new Sequelize('iboss', 'root', 'doremi', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize