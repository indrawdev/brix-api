const Member = require('../models/member')

exports.listMembers = (req, res, next) => {
    const policyId = req.params.policy
    Member.find({ where: ''})
        .then({
            
        })
        .catch({

        })
}

exports.getMember = (req, res, next) => { 
    const policyId = req.params.policy
    const memberId = req.params.id

}