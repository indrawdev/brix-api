const sequelize = require('../config/database')

const Reimburse = require('../models/reimburse')
const Cashless = require('../models/cashless')

const totalClaim = async (req, res, next) => { 
   const clientId = parseInt(req.query.client)
   const policyId = parseInt(req.query.policy)

   try {
      const reimburses = await Reimburse.findAll({
         attributes: [
            [sequelize.fn('MONTHNAME', sequelize.col('created_at')), 'month'],
            [sequelize.fn('SUM', sequelize.col('total_amount')), 'tot_amount'],
            [sequelize.fn('COUNT', sequelize.col('total_claim')), 'tot_case'],
            [sequelize.fn('SUM', sequelize.col('total_outstanding')), 'tot_outs'],
         ],
         where: {
            client_id: clientId,
            policy_id: policyId,
            is_active: '1'
         },
         group: [sequelize.fn('MONTHNAME', sequelize.col('created_at'))],
         order: [
            ['created_at', 'DESC']
         ]
      })
   
      const cashless = await Cashless.findAll({
         attributes: [
            [sequelize.fn('MONTHNAME', sequelize.col('created_at')), 'month'],
            [sequelize.fn('SUM', sequelize.col('total_excess')), 'tot_amount'],
            [sequelize.fn('COUNT', sequelize.col('total_case')), 'tot_case'],
         ],
         where: {
            client_id: clientId,
            policy_id: policyId,
            is_active: '1'
         },
         group: [sequelize.fn('MONTHNAME', sequelize.col('created_at'))],
         order: [
            ['created_at', 'ASC']
         ]
      })
   
      res.status(200).json({
         success: true,
         reimburses: reimburses,
         cashlesses: cashless
      })
      next()

   } catch (err) {
      res.status(500).json({ message: err })
      next()
   }
}

const totalClaimByAmount = async (req, res, next) => { 
   const clientId = parseInt(req.query.client)
   const policyId = parseInt(req.query.policy)

}

exports.totalClaim = totalClaim