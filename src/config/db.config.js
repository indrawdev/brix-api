module.exports = {
    host: "localhost",
    user: "root",
    pass: "doremi",
    db: "iboss",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};