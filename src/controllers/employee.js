const { Op } = require('sequelize')

const Employee = require('../models/employee')
const Family = require('../models/family')
const File = require('../models/file')
const Formal = require('../models/formal')
const Informal = require('../models/informal')
const Experience = require('../models/experience')
const Reference = require('../models/reference')

exports.listEmployees = async (req, res, next) => {
	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)
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

	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)

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
	const {
		employee,
		name, dob,
		relation,
		marital,
		gender,
		religion,
		user
	} = JSON.parse(JSON.stringify(req.body))

	await Family.create({
		employee_id: employee,
		family_name: name,
		family_dob: dob,
		family_relation: relation,
		family_marital: marital,
		family_gender: gender,
		family_religion: religion,
		created_by: user,
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

	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)

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

	await File.delete({})
}

exports.listFormals = async (req, res, next) => {
	const employeeId = req.params.id

	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)

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
	const {
		employee,
		grade,
		institution,
		majors,
		score,
		start_year,
		end_year,
		user
	} = JSON.parse(JSON.stringify(req.body))


	await Formal.create({
		'employee_id': employee,
		'grade': grade,
		'institution': institution,
		'majors': majors,
		'score': score,
		'start_year': start_year,
		'end_year': end_year,
		'created_by': user,
		'created_at': ''
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

exports.updateFormal = async (req, res, next) => {
	const employeeId = req.params.id
	const formalId = req.params.fid

	const {
		grade,
		institution,
		majors,
		score,
		start_year,
		end_year,
		user
	} = JSON.parse(JSON.stringify(req.body))

	await Formal.update({
		'grade': grade,
		'institution': institution,
		'majors': majors,
		'score': score,
		'start_year': start_year,
		'end_year': end_year,
		'updated_by': user,
		'updated_at': ''
	}, {
		where: {
			'employee_id': employeeId,
			'formal_id': formalId
		}
	})

}

exports.deleteFormal = async (req, res, next) => {

}

exports.listInformals = async (req, res, next) => {
	const employeeId = req.params.id

	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)

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

	const {
		education,
		held_by,
		start_date,
		end_date,
		duration_type,
		fee,
		description,
		attach_file,
		user
	} = JSON.parse(JSON.stringify(req.body))

	await Informal.create({
		'employee_id': employeeId,
		'education': education,
		'held_by': held_by,
		'start_date': start_date,
		'end_date': end_date,
		'duration_type': duration_type,
		'fee': fee,
		'description': description,
		'attach_file': attach_file,
		'created_by': user,
		'created_at': ''
	})

}

exports.updateInformal = async (req, res, next) => {
	const employeeId = req.params.id
	const informalId = req.params.fid

	const {
		education,
		held_by,
		start_date,
		end_date,
		duration_type,
		fee,
		description,
		attach_file,
		user
	} = JSON.parse(JSON.stringify(req.body))

	await Informal.update({
		'education': education,
		'held_by': held_by,
		'start_date': start_date,
		'end_date': end_date,
		'duration_type': duration_type,
		'fee': fee,
		'description': description,
		'attach_file': attach_file,
		'updated_by': user,
		'updated_at': new Date()
	}, {
		where: {
			'employee_id': employeeId,
			'informal_id': informalId
		}
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
	})
}

exports.listExperiences = async (req, res, next) => {
	const employeeId = req.params.id

	let offset = parseInt(req.query.offset)
	let limit = parseInt(req.query.limit)

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
	const {
		employee,
		company,
		position,
		from,
		to,
		user
	} = JSON.parse(JSON.stringify(req.body))

	await Experience.create({
		'employee_id': employee,
		'company_name': company,
		'job_position': position,
		'from_date': from,
		'to_date': to,
		'created_by': user,
		'created_at': new Date()
	})

}

exports.updateExperience = async (req, res, next) => {
	const employeeId = req.params.id
	const experienceId = req.params.fid

	const {
		employee,
		company,
		position,
		from,
		to,
		user
	} = JSON.parse(JSON.stringify(req.body))

	await Experience.update({
		'empployee': employee,
		'company': company,
		'position': position,
		'from': from,
		'to': to,
		'updated_by': user,
		'updated_at': new Date()
	}, {
		where: {
			'employee_id': employeeId,
			'experience_id': experienceId
		}
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
	})
}