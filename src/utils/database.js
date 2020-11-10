const Sequelize = require('sequelize')

const sequelize = new Sequelize('new_iboss', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize