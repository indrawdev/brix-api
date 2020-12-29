const Timeoff = require('../models/timeoff')

exports.listEmployee = async (req, res, next) => { 

}

exports.createTimeOff = async (req, res, next) => { 
	const body = req.body

	try {
		const timeoff = await Timeoff.create(body)
	} catch (err) {
		res.status(400).json()
		next()
	}
}