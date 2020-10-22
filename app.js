const express = require("express");
const app = express();

const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'new_iboss'
});

connection.connect((err) => {
    if (err) throw err;

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });

});

app.get("/login", (req, res, next) => {
    res.json("");
});

app.get("/", (req, res, next) => {
    res.json("");
});