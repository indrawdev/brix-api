const { Op } = require('sequelize')

const Employee = require('../models/employee')
const Family = require('../models/family')
const File = require('../models/file')
const Formal = require('../models/formal')
const Informal = require('../models/informal')
const Experience = require('../models/experience')
const Reference = require('../models/reference')

exports.listEmployees = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10
	let search = req.query.search

	await Employee.findAndCountAll({
		where: {
			is_active: 1,
			employee_name: {
				[Op.like]: `%${search}%`
			}
		},
		order: [
			['employee_name', 'ASC']
		],
		offset: offset, limit: limit
	})
		.then(results => {
			res.status(200).json({ success: true, data: results })
			next()
		})
		.catch(err => {
			res.status(400).json({ success: false, message: err })
			next()
		})
}

exports.getEmployee = async (req, res, next) => {
	const employeeId = req.params.id

	await Employee.findByPk(employeeId, {
		include: [Family, File, Formal, Informal, Experience, {
			model: Reference,
			where: {
				reference_group: 'detail_dept'
			}
		}]
	})
		.then(employee => {
			if (employee) {
				res.status(200).json({ success: true, data: employee })
				next()
			} else {
				res.status(404).json({ success: false, message: 'Not found' })
				next()
			}
		})
		.catch(err => {
			res.status(400).json({ success: false, message: err })
			next()
		})
}

exports.listFamilies = async (req, res, next) => {
	const employeeId = req.params.id

	let offset = parseInt(req.query.offset) || 1
	let limit = parseInt(req.query.limit) || 10

	await Family.findAndCountAll({
		where: {
			employee_id: employeeId
		},
		order: [
			['family_id', 'DESC']
		],
		offset: offset, limit: limit
	})
		.then(results => {
			res.status(200).json({ success: true, data: results })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.createFamily = async (req, res, next) => {
	const data = JSON.parse(JSON.stringify(req.body))

	await Family.create({
		employee_id: data.employee,
		family_name: data.name,
		family_dob: data.dob,
		family_relation: data.relation,
		family_marital: data.marital,
		family_gender: data.gender,
		family_religion: data.religion,
		created_by: data.user,
		created_at: new Date()
	})
		.then(results => {
			res.status(200).json({ success: true, data: results })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.updateFamily = async (req, res, next) => {
	const employeeId = req.params.id
	const familyId = req.params.fid

	const {
		name,
		dob,
		relation,
		marital,
		gender,
		religion,
	} = JSON.parse(JSON.stringify(req.body))

	await Family.update({
		'name': name,
		'dob': dob,
		'relation': relation,
		'marital': marital,
		'gender': gender,
		'religion': religion
	}, {
		where: {
			employee_id: employeeId,
			family_id: familyId
		}
	})
}

exports.deleteFamily = async (req, res, next) => {
	const employeeId = req.params.id
	const familyId = req.params.fid

	await Family.delete({
		where: {
			employee_id: employeeId,
			family_id: familyId
		}
	})
		.then(results => {
			res.status(200).json({ success: true, data: results })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.listFiles = async (req, res, next) => {
	const employeeId = req.params.id

	let offset = parseInt(req.query.offset) || 1
	let limit = parseInt(req.query.limit) || 10

	await File.findAndCountAll({
		where: {
			employee_id: employeeId
		},
		order: [
			['file_id', 'DESC']
		],
		offset: offset, limit: limit
	})
		.then(results => {
			res.status(200).json({ success: true, data: results })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.createFile = async (req, res, next) => {
	const employeeId = req.params.id

	const { fileName, user } = JSON.parse(JSON.stringify(req.body))

	await File.create({
		'employee_id': employeeId,
		'filename': fileName,
		'created_by': user,
		'created_at': new Date()
	})
}

exports.deleteFile = async (req, res, next) => {
	const employeeId = req.params.id
	const fileId = req.params.fid

	await File.delete({
		where: {
			'employee_id': employeeId,
			'file_id': fileId
		}
	}).then(result => { })
}

exports.listFormals = async (req, res, next) => {
	const employeeId = req.params.id

	let offset = parseInt(req.query.offset) || 1
	let limit = parseInt(req.query.limit) || 10

	await Formal.findAndCountAll({
		where: {
			employee_id: employeeId
		},
		order: [
			['formal_id', 'DESC']
		],
		offset: offset, limit: limit
	})
		.then(results => {
			res.status(200).json({ success: true, data: results })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.createFormal = async (req, res, next) => {
	const data = JSON.parse(JSON.stringify(req.body))

	await Formal.create({
		'employee_id': data.employee,
		'grade': data.grade,
		'institution': data.institution,
		'majors': data.majors,
		'score': data.score,
		'start_year': data.start_year,
		'end_year': data.end_year,
		'created_by': data.user,
		'created_at': new Date()
	})
		.then(result => {
			res.status(200).json({ success: true, data: result })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.updateFormal = async (req, res, next) => {
	const employeeId = req.params.id
	const formalId = req.params.fid

	const data = JSON.parse(JSON.stringify(req.body))

	await Formal.update({
		'grade': data.grade,
		'institution': data.institution,
		'majors': data.majors,
		'score': data.score,
		'start_year': data.start_year,
		'end_year': data.end_year,
		'updated_by': data.user,
		'updated_at': new Date()
	}, {
		where: {
			'employee_id': employeeId,
			'formal_id': formalId
		}
	}).then(result => {
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}

exports.deleteFormal = async (req, res, next) => {
	const employeeId = req.params.id
	const formalId = req.params.fid

	await Formal.delete({
		where: {
			'employee_id': employeeId,
			'formal_id': formalId
		}
	}).then(result => {
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}

exports.listInformals = async (req, res, next) => {
	const employeeId = req.params.id

	let offset = parseInt(req.query.offset) || 1
	let limit = parseInt(req.query.limit) || 10

	await Informal.findAndCountAll({
		where: {
			employee_id: employeeId
		},
		order: [
			['informal_id', 'DESC']
		],
		offset: offset, limit: limit
	})
		.then(results => {
			res.status(200).json({ success: true, data: results })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.createInformal = async (req, res, next) => {
	const employeeId = req.params.id

	const data = JSON.parse(JSON.stringify(req.body))

	await Informal.create({
		'employee_id': employeeId,
		'education': data.education,
		'held_by': data.held_by,
		'start_date': data.start_date,
		'end_date': data.end_date,
		'duration_type': data.duration_type,
		'fee': data.fee,
		'description': data.description,
		'attach_file': data.attach_file,
		'created_by': data.user,
		'created_at': new Date()
	}).then(result => {
		res.status(201).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}

exports.updateInformal = async (req, res, next) => {
	const employeeId = req.params.id
	const informalId = req.params.fid

	const data = JSON.parse(JSON.stringify(req.body))

	await Informal.update({
		'education': data.education,
		'held_by': data.held_by,
		'start_date': data.start_date,
		'end_date': data.end_date,
		'duration_type': data.duration_type,
		'fee': data.fee,
		'description': data.description,
		'attach_file': data.attach_file,
		'updated_by': data.user,
		'updated_at': new Date()
	}, {
		where: {
			'employee_id': employeeId,
			'informal_id': informalId
		}
	}).then(result => {
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}

exports.deleteInformal = async (req, res, next) => {
	const employeeId = req.params.id
	const informalId = req.params.fid

	await Informal.delete({
		where: {
			'employee_id': employeeId,
			'informal_id': informalId
		}
	}).then(result => {
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}

exports.listExperiences = async (req, res, next) => {
	const employeeId = req.params.id

	let offset = parseInt(req.query.offset) || 1
	let limit = parseInt(req.query.limit) || 10

	await Experience.findAndCountAll({
		where: {
			employee_id: employeeId
		},
		order: [
			['experience_id', 'DESC']
		],
		offset: offset, limit: limit
	})
		.then(results => {
			res.status(200).json({ success: true, data: results })
			next()
		})
		.catch(err => {
			res.status(500).json({ success: false, message: err })
			next()
		})
}

exports.createExperience = async (req, res, next) => {
	const data = JSON.parse(JSON.stringify(req.body))

	await Experience.create({
		'employee_id': data.employee,
		'company_name': data.company,
		'job_position': data.position,
		'from_date': data.from,
		'to_date': data.to,
		'created_by': data.user,
		'created_at': new Date()
	}).then(result => {
		res.status(201).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}

exports.updateExperience = async (req, res, next) => {
	const employeeId = req.params.id
	const experienceId = req.params.fid

	const data = JSON.parse(JSON.stringify(req.body))

	await Experience.update({
		'empployee': data.employee,
		'company': data.company,
		'position': data.position,
		'from': data.from,
		'to': data.to,
		'updated_by': data.user,
		'updated_at': new Date()
	}, {
		where: {
			'employee_id': employeeId,
			'experience_id': experienceId
		}
	}).then(result => {
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})

}

exports.deleteExperience = async (req, res, next) => {
	const employeeId = req.params.id
	const experienceId = req.params.fid

	await Experience.delete({
		where: {
			'employee_id': employeeId,
			'experience_id': experienceId
		}
	}).then(result => {
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}