const User = require('../models/user')
const Client = require('../models/client')

// show all users
exports.listUsers = (req, res, next) => {

    User.findAll({include: Client})
        .then(users => {
            if (users) {
                res.status(200).json({
                    success: true,
                    data: users
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

// show single user
exports.getUser = (req, res, next) => {
    const userId = req.params.id 

    User.findByPk(userId, { include: Client })
        .then(users => {
            if (users) {
                res.status(200).json({
                    success: true,
                    data: users
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