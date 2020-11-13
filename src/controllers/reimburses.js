const Reimburse = require('../models/reimburse')

// show all reimburses
exports.listReimburses = (req, res, next) => {

    Reimburse.findAll()
        .then(reimburses => {
            if (reimburses) {
                res.status(200).json({
                    success: true,
                    data: reimburses
                })
                next()
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Not found'
                })
                next()
            }
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                data: err
            })
            next()
        });
}

// show single reimburse
exports.getReimburse = (req, res, next) => {
    
    const reimburseId = req.params.id
    Reimburse.findByPk(reimburseId)
        .then(product => {
            if (product) {
                res.status(200).json({
                    success: true,
                    data: product
                })
                next()
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Not found'
                })
                next()
            }
        })
        .catch(err => { 
            console.log(err)
            res.status(400).json({
                success: false,
                data: err
            })
        })
}

// insert new reimburse
exports.createReimburse = (req, res, next) => {
    // let data = {
    //     client_id: req.body.client_id,
    //     policy_id: req.body.policy_id,
    //     member_id: req.body.member_id,
    //     amount: req.body.amount,
    // };

    // let sql = "INSERT INTO t_claims SET ?";

    // conn.query(sql, data, (err, results) => { 
    //     res.json(
    //         {
    //             success: true,
    //             messages: 'Create reimburse success',
    //             data: results
    //         }
    //     );
    //     next();
    // });
}

exports.editReimburse = (req, res, next) => {
    // let sql = "UPDATE t_claims SET ? WHERE ?";
    // conn.query(sql, data, (err, results) => { 
    //     res.json(
    //         {
    //             success: true,
    //             messages: 'Update data reimburse',
    //             data: results
    //         }
    //     );
    //     next();
    // });
}

exports.deleteReimburse = (req, res, next) => {
    // res.json(
    //     {
    //         success: true,
    //         messages: 'Delete data reimburse',
    //         data: {

    //         }
    //     }
    // );
    // next();
}