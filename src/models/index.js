const Sequelize = require("sequelize");

const config = require("../config/db.config");

const sequelize = new Sequelize(
    config.db,
    config.user,
    config.pass,
    {
        host: config.host,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

module.exports = database;