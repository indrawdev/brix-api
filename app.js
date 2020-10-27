const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'new_iboss'
});

const reimburseRoutes = require('./src/routes/reimburses');
const reimburseRoutes = require('./src/routes/reimburses');

connection.connect((err) => {
    if (err) throw err;
    
    app.use(cors());
    
    app.use(bodyParser.json());

    app.use('/', reimburseRoutes);

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
});
