const conn = require('../config/db');

// show all reimburses
exports.listReimburses = (req, res, next) => {
    let sql = "SELECT * FROM t_claims";
    conn.query(sql, (err, results) => { 
        if (err) throw err;
        res.json(
            {
                success: true,
                messages: 'List data reimburses',
                data: results
            }
        );
        next();
    });
}

// show single reimburse
exports.getReimburse = (req, res, next) => {
    let sql = "SELECT * FROM t_claims WHERE claim_id = " + req.params.id;
    conn.query(sql, (err, results) => { 
        if (err) throw err;

        res.json(
            {
                success: true,
                messages: 'Get data reimburse',
                data: results
            }
        );
        next();
    });
}

// insert new reimburse
exports.createReimburse = (req, res, next) => {
    let data = {
        client_id: req.body.client_id,
        policy_id: req.body.policy_id,
        member_id: req.body.member_id,
        amount: req.body.amount,
    };

    let sql = "INSERT INTO t_claims SET ?";

    conn.query(sql, data, (err, results) => { 
        res.json(
            {
                success: true,
                messages: 'Create reimburse success',
                data: results
            }
        );
        next();
    });
}

exports.editReimburse = (req, res, next) => {
    let sql = "UPDATE t_claims SET ? WHERE ?";
    conn.query(sql, data, (err, results) => { 
        res.json(
            {
                success: true,
                messages: 'Update data reimburse',
                data: results
            }
        );
        next();
    });
}

exports.deleteReimburse = (req, res, next) => {
    res.json(
        {
            success: true,
            messages: 'Delete data reimburse',
            data: {

            }
        }
    );
    next();
}