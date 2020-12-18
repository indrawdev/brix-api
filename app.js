const dotenv = require('dotenv')
dotenv.config()

const hostname = process.env.APP_HOST;

const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cors = require('cors');

const sequelize = require('./src/config/database')

const UserClient = require('./src/models/userclient')
const Client = require('./src/models/client')
const Policy = require('./src/models/policy')
const Insurance = require('./src/models/insurance')
const Reimburse = require('./src/models/reimburse')
const ReimburseMember = require('./src/models/reimburseMember')
const Cashless = require('./src/models/cashless')
const CashlessMember = require('./src/models/cashlessMember')
const Member = require('./src/models/member')
const Dependent = require('./src/models/dependent')

const User = require('./src/models/user')
const Employee = require('./src/models/employee')

// Associations for Client Portal
Client.hasMany(UserClient, { foreignKey: 'client_id' })
UserClient.belongsTo(Client, { foreignKey: 'client_id' })
Client.hasMany(Policy, { foreignKey: 'client_id' })
Policy.belongsTo(Client, { foreignKey: 'client_id' })
Insurance.hasMany(Policy, { foreignKey: 'insurance_id' })
Policy.belongsTo(Insurance, { foreignKey: 'insurance_id' })
Client.hasMany(Reimburse, { foreignKey: 'client_id' })
Reimburse.belongsTo(Client, { foreignKey: 'client_id' })
Policy.hasMany(Reimburse, { foreignKey: 'policy_id' })
Reimburse.belongsTo(Policy, { foreignKey: 'policy_id' })
Client.hasMany(Cashless, { foreignKey: 'client_id' })
Cashless.belongsTo(Client, { foreignKey: 'client_id' })
Policy.hasMany(Cashless, { foreignKey: 'policy_id' })
Cashless.belongsTo(Policy, { foreignKey: 'policy_id' })
Reimburse.hasMany(ReimburseMember, { foreignKey: 'batch_code', sourceKey: 'batch_code'})
ReimburseMember.belongsTo(Reimburse, { foreignKey: 'batch_code', targetKey: 'batch_code' })
Cashless.hasMany(CashlessMember, { foreignKey: 'batch_code', sourceKey: 'batch_code' })
CashlessMember.belongsTo(Cashless, { foreignKey: 'batch_code', targetKey: 'batch_code' })
Member.hasMany(Dependent, { foreignKey: 'member_nik', sourceKey: 'member_nik' })
Dependent.belongsTo(Member, { foreignKey: 'member_nik', targetKey: 'member_nik' })

// Associations for HR Portal
Employee.hasOne(User, { foreignKey: 'employee_id', sourceKey: 'employee_id' })
User.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'employee_id' })

const app = express();

const frontRoutes = require('./src/routes/front');
const authRoutes = require('./src/routes/auth');
const userclientRoutes = require('./src/routes/userclients');
const clientRoutes = require('./src/routes/clients');
const policyRoutes = require('./src/routes/policies');
const insuranceRoutes = require('./src/routes/insurances');
const reimburseRoutes = require('./src/routes/reimburses');
const cashlessRoutes = require('./src/routes/cashlesses');
const memberRoutes = require('./src/routes/members');
const dashboardRoutes = require('./src/routes/dashboard');
const Employee = require('./src/models/employee');

const port = process.env.APP_PORT || 3000;

app.use(cors());

app.use(bodyParser.text({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(upload.array()); 

// routes client portal
app.use('/', frontRoutes)
app.use('/v1', authRoutes)
app.use('/v1', userclientRoutes)
app.use('/v1', clientRoutes)
app.use('/v1', policyRoutes)
app.use('/v1', insuranceRoutes)
app.use('/v1', reimburseRoutes)
app.use('/v1', cashlessRoutes)
app.use('/v1', memberRoutes)
app.use('/v1', dashboardRoutes)

// routes employee portal


sequelize
    .sync({ force: false })
    .then(result => {
        // running
        app.listen(port, () => {
            console.log(`Server is running on port ${hostname} | ${port}.`);
        });
    })
    .catch(err => {
        console.log(err);
    });