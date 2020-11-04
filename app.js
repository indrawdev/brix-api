const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const reimburseRoutes = require('./src/routes/reimburses');
const cashlessRoutes = require('./src/routes/cashlesses');

const database = require("./src/models");
database.sequelize.sync();

const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

// routes
app.use('/v1', reimburseRoutes);
app.use('/v1', cashlessRoutes);

// running
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
