
const emailServer = require('../utils/EmailServer');
const  db  = require('../config/db');



exports.registerUrs = function (req, res) {

    var dataToInsert = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        status: 0,
        created_at: new Date()
    };

    db.Users.findOrCreate({ where: { email: req.body.email }, defaults: dataToInsert })
        .spread((user, created) => {
            if (created) {
                console.log(" User registered");
                res.json({
                    success: true,
                    message: 'User registered successfully.'
                })
                emailServer.sendActivationEmail(req, res, user.user_id);
            } else {
                console.log(" User already exist");
                res.json({
                    success: false,
                    message: 'Email already registered.'
                })
            }
        });

}

exports.render_forgot_password_template = function (req, res) {
    return res.sendFile(path.resolve('./public/forgot-password.html'))
}

exports.render_reset_password_template = function (req, res) {
    return res.sendFile(path.resolve('./public/reset-password.html'))
}

exports.getPrfileDetails = function (req, res) {

    let options = {
        where: { email: req.body.email }
    }

    db.Users.findOne(options).then(result => {
        if (result) {
            res.json({
                success: true,
                user: result
            })
        } else {
            res.json({
                success: false,
                message: 'User does not exist'
            })
        }
    })

}

exports.updateProfile = function (req, res) {

    var dataToUpdate = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        status: 0,
        created_at: new Date()
    };
    let options = {
        where: { email: req.body.email }
    }

    db.Users.update(dataToUpdate, options)
        .then(result => {
            let response = {
                message: 'Configuration updated successfully',
                success: true
            }
            return res.send(response)
        })
}



