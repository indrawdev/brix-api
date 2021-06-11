const dotenv = require('dotenv')
dotenv.config()

const hostname = process.env.APP_HOST

const express = require("express")
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const cors = require('cors')
const sequelize = require('./src/config/database')

// Models for client
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
const Reference = require('./src/models/reference')

// Models for HR
const Attendance = require('./src/models/attendance')
const Timeoff = require('./src/models/timeoff')
const Family = require('./src/models/family')
const Contact = require('./src/models/contact')
const File = require('./src/models/file')
const Formal = require('./src/models/formal')
const Informal = require('./src/models/informal')
const Experience = require('./src/models/experience')

// Models for BRIX
const Group = require('./src/models/group')
const Pipeline = require('./src/models/pipeline')
const Request = require('./src/models/request')
const Proposal = require('./src/models/proposal')
const Placing = require('./src/models/placing')

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

// Associations general
Employee.hasOne(User, { foreignKey: 'employee_id', sourceKey: 'employee_id' })
User.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'employee_id' })
Employee.hasOne(Reference, { foreignKey: 'reference_value', sourceKey: 'employee_dept' })
Reference.belongsTo(Employee, { foreignKey: 'reference_value', targetKey: 'employee_dept' })

// Associations for HR Portal
Employee.hasMany(Attendance, { foreignKey: 'employee_id' })
Attendance.belongsTo(Employee, { foreignKey: 'employee_id' })
Employee.hasMany(Timeoff, { foreignKey: 'employee_id' })
Timeoff.belongsTo(Employee, { foreignKey: 'employee_id' })
Employee.hasMany(Family, { foreignKey: 'employee_id' })
Family.belongsTo(Employee, { foreignKey: 'employee_id' })
Employee.hasMany(Contact, { foreignKey: 'employee_id' })
Contact.belongsTo(Employee, { foreignKey: 'employee_id' })
Employee.hasMany(File, { foreignKey: 'employee_id' })
File.belongsTo(Employee, { foreignKey: 'employee_id' })
Employee.hasMany(Formal, { foreignKey: 'employee_id' })
Formal.belongsTo(Employee, { foreignKey: 'employee_id' })
Employee.hasMany(Informal, { foreignKey: 'employee_id' })
Informal.belongsTo(Employee, { foreignKey: 'employee_id' })
Employee.hasMany(Experience, { foreignKey: 'employee_id' })
Experience.belongsTo(Employee, { foreignKey: 'employee_id' })

// Associations for BRIX
Pipeline.hasMany(Request, { foreignKey: 'pipeline_id' })
Request.belongsTo(Pipeline, { foreignKey: 'pipeline_id' })
Client.hasMany(Request, { foreignKey: 'client_id' })
Request.belongsTo(Client, { foreignKey: 'client_id' })
Group.hasOne(Pipeline, { foreignKey: 'group_id', sourceKey: 'group_id' })
Pipeline.belongsTo(Group, { foreignKey: 'group_id', targetKey: 'group_id' })
Request.hasOne(Proposal, { foreignKey: 'request_id', sourceKey: 'request_id' })
Proposal.belongsTo(Request, { foreignKey: 'request_id', targetKey: 'request_id' })
Employee.hasOne(Request, { foreignKey: 'employee_id', sourceKey: 'employee_id' })
Request.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'employee_id' })
Request.hasOne(Placing, { foreignKey: 'request_id', sourceKey: 'request_id' })
Placing.belongsTo(Request, { foreignKey: 'request_id', targetKey: 'request_id' })
Proposal.hasOne(Placing, { foreignKey: 'proposal_id', sourceKey: 'proposal_id' })
Placing.belongsTo(Proposal, { foreignKey: 'proposal_id', targetKey: 'proposal_id' })
Insurance.hasMany(Placing, { foreignKey: 'insurance_id' })
Placing.belongsTo(Insurance, { foreignKey: 'insurance_id' })

// init routes for client
const frontRoutes = require('./src/routes/front')
const authRoutes = require('./src/routes/auth')
const userclientRoutes = require('./src/routes/userclients')
const clientRoutes = require('./src/routes/clients')
const policyRoutes = require('./src/routes/policies')
const insuranceRoutes = require('./src/routes/insurances')
const reimburseRoutes = require('./src/routes/reimburses')
const cashlessRoutes = require('./src/routes/cashlesses')
const memberRoutes = require('./src/routes/members')
const dashboardRoutes = require('./src/routes/dashboard')

// init routes for HR
const employeeRoutes = require('./src/routes/employees')
const attendanceRoutes = require('./src/routes/attendances')
const timeoffRoutes = require('./src/routes/timeoffs')

// init routes for BRIX
const pipelineRoutes = require('./src/routes/pipeline')
const requestRoutes = require('./src/routes/request')
const renewalRoutes = require('./src/routes/renewal')
const releaseRoutes = require('./src/routes/release')
const placingRoutes = require('./src/routes/placing')
const quotationRoutes = require('./src/routes/quotation')

const port = process.env.APP_PORT || 3000

const app = express()

app.use(cors())
app.use(bodyParser.text({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(upload.array())

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
app.use('/v2', employeeRoutes)
app.use('/v2', attendanceRoutes)
app.use('/v2', timeoffRoutes)

// routes brix
app.use('/v3', pipelineRoutes)
app.use('/v3', requestRoutes)
app.use('/v3', renewalRoutes)
app.use('/v3', releaseRoutes)
app.use('/v3', placingRoutes)
app.use('/v3', quotationRoutes)

sequelize
	.sync({ force: false })
	.then(result => {
		// running
		app.listen(port, () => {
			console.log(`Server is running on port ${hostname} | ${port}.`)
		})
	})
	.catch(err => {
		console.log(err)
	})