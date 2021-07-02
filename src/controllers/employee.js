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
	let search = req.query.search || ''

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
	const employeeId = parseInt(req.params.id)

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
	const employeeId = parseInt(req.params.eid)

	let offset = parseInt(req.query.offset) || 0
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
		'employee_id': data.employee_id,
		'family_name': data.family_name,
		'family_dob': data.family_dob,
		'family_relation': data.family_relation,
		'family_marital': data.family_marital,
		'family_gender': data.family_gender,
		'family_religion': data.family_religion,
		'created_by': data.user_id,
		'created_at': new Date()
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
	const familyId = parseInt(req.params.id)

	const data = JSON.parse(JSON.stringify(req.body))

	await Family.update({
		'family_name': data.family_name,
		'family_dob': data.family_dob,
		'family_relation': data.family_relation,
		'family_marital': data.family_marital,
		'family_gender': data.family_gender,
		'family_religion': data.family_religion,
		'updated_by': data.user_id,
		'updated_at': new Date()
	}, {
		where: {
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

exports.deleteFamily = async (req, res, next) => {
	const familyId = parseInt(req.params.id)

	await Family.delete({
		where: {
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
	const employeeId = parseInt(req.params.eid)

	let offset = parseInt(req.query.offset) || 0
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
	const data = JSON.parse(JSON.stringify(req.body))

	await File.create({
		'employee_id': data.employee_id,
		'filename': data.filename,
		'created_by': data.user_id,
		'created_at': new Date()
	}).then(result => {
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}

exports.deleteFile = async (req, res, next) => {
	const fileId = parseInt(req.params.id)

	await File.delete({
		where: {
			'file_id': fileId
		}
	}).then(result => {
		res.status(200).json({ success: true, data: result })
		next()
	}).catch(err => {
		res.status(500).json({ success: false, message: err })
		next()
	})
}

exports.listFormals = async (req, res, next) => {
	const employeeId = parseInt(req.params.id)

	let offset = parseInt(req.query.offset) || 0
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
		'employee_id': data.employee_id,
		'grade': data.grade,
		'institution': data.institution,
		'majors': data.majors,
		'score': data.score,
		'start_year': data.start_year,
		'end_year': data.end_year,
		'created_by': data.user_id,
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
	const formalId = parseInt(req.params.id)

	const data = JSON.parse(JSON.stringify(req.body))

	await Formal.update({
		'grade': data.grade,
		'institution': data.institution,
		'majors': data.majors,
		'score': data.score,
		'start_year': data.start_year,
		'end_year': data.end_year,
		'updated_by': data.user_id,
		'updated_at': new Date()
	}, {
		where: {
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
	const formalId = parseInt(req.params.id)

	await Formal.delete({
		where: {
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
	const employeeId = parseInt(req.params.eid)

	let offset = parseInt(req.query.offset) || 0
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
	const data = JSON.parse(JSON.stringify(req.body))

	await Informal.create({
		'employee_id': data.employee_id,
		'education': data.education,
		'held_by': data.held_by,
		'start_date': data.start_date,
		'end_date': data.end_date,
		'duration_type': data.duration_type,
		'fee': data.fee,
		'description': data.description,
		'attach_file': data.attach_file,
		'created_by': data.user_id,
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
	const informalId = parseInt(req.params.id)

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
		'updated_by': data.user_id,
		'updated_at': new Date()
	}, {
		where: {
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
	const informalId = parseInt(req.params.id)

	await Informal.delete({
		where: {
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
	const employeeId = parseInt(req.params.eid)

	let offset = parseInt(req.query.offset) || 0
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
		'employee_id': data.employee_id,
		'company_name': data.company_name,
		'job_position': data.job_position,
		'from_date': data.from_date,
		'to_date': data.to_date,
		'created_by': data.user_id,
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
	const experienceId = parseInt(req.params.id)

	const data = JSON.parse(JSON.stringify(req.body))

	await Experience.update({
		'company_name': data.company_name,
		'job_position': data.job_position,
		'from_date': data.from_date,
		'to_date': data.to_date,
		'updated_by': data.user_id,
		'updated_at': new Date()
	}, {
		where: {
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
	const experienceId = parseInt(req.params.id)

	await Experience.delete({
		where: {
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