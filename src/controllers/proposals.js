const Proposal = require('../models/proposal')
const Request = require('../models/request')

exports.listProposals = async (req, res, next) => {
	let offset = parseInt(req.query.offset) || 0
	let limit = parseInt(req.query.limit) || 10

	await Proposal.findAndCountAll({
		order: [
			['proposal_id', 'DESC']
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


exports.getProposal = async (req, res, next) => {
	const proposalId = req.params.id

	await Proposal.findByPk(proposalId, {
		include: Request
	})
		.then(result => {
			if (result) {
				res.status(200).json({ success: true, data: result })
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