const express = require("express");

const router = express.Router();

const reimbursesController = require('../controllers/reimburses');

router.get('/policy/:policyId/reimburses', reimbursesController.listReimburses);
router.get('/reimburse/:id', reimbursesController.getReimburse);

router.post('/reimburses', reimbursesController.createReimburse);
router.put('/reimburse/:id', reimbursesController.editReimburse);
router.delete('/reimburse/:id', reimbursesController.deleteReimburse);

module.exports = router;