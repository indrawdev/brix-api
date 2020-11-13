const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./src/utils/database')

const User = require('./src/models/user')
const Client = require('./src/models/client')
const Policy = require('./src/models/policy')
const Insurance = require('./src/models/insurance')
const Reimburse = require('./src/models/reimburse')
const Cashless = require('./src/models/cashless')

const app = express();

const authRoutes = require('./src/routes/auth');
const clientRoutes = require('./src/routes/clients');
const policyRoutes = require('./src/routes/policies');
const insuranceRoutes = require('./src/routes/insurances');
const reimburseRoutes = require('./src/routes/reimburses');
const cashlessRoutes = require('./src/routes/cashlesses');

const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json())

// routes
app.use('/v1', authRoutes)
app.use('/v1', clientRoutes)
app.use('/v1', policyRoutes)
app.use('/v1', insuranceRoutes)
app.use('/v1', reimburseRoutes)
app.use('/v1', cashlessRoutes)

sequelize
    .sync({ force: false })
    .then(result => {
        // running
        app.listen(port, () => {
            console.log(`Server is running on port ${port}.`);
        });
    })
    .catch(err => {
        console.log(err);
    });