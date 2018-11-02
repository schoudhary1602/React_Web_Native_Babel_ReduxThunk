
const emailServer = require('../utils/EmailServer');
const db = require('../config/db');
var jwt = require('jsonwebtoken');
var StringConstants = require('../config/StringConstants');

/** ==============================================================================================================
 *   User Authentication 
 ================================================================================================================= */
exports.authenticateUser = function (req, res) {


    let options = {
        where: { email: req.body.email }
    }

    db.Users.findOne(options).then(result => {
        if (result) {
            console.log(result.password);
            console.log(req.body.password);
            // check if password matches
            if (result.password != req.body.password) {
                res.json({
                    success: false,
                    message: StringConstants.Eng_Message.AuthenticationFaild
                })
            } else {

                if (result.status == 0) {
                    res.json({
                        success: false,
                        message: StringConstants.Eng_Message.ActivationLinkSent
                    })
                } else {

                    // if user is found and password is right
                    // create a token
                    var payload = {
                        admin: result
                    }

                    //var token = jwt.sign(payload, app.get('superSecret')
                    var token = jwt.sign(payload, 'supersecret', {
                        expiresIn: 86400 // expires in 24 hours
                    })

                    res.json({
                        success: true,
                        message: 'use x-access-token header to send token back to server',
                        token: token,
                        user_id: result.user_id
                    })
                }
            }
        } else {
            res.json({
                success: false,
                message: 'Authentication failed. Email not found.'
            })
        }
    })
}


/** ==============================================================================================================
 *   Forget password functions
 ================================================================================================================= */
exports.verifyEmail = function (req, res) {

    let options = {
        where: { email: req.body.email }
    }

    db.Users.findOne(options).then(result => {
        if (result) {

            // check if password matches
            {

                emailServer.sendVerifyEmailTokenEmail(req).then(function (token, info) {
                    checkEmailToken(result.user_id, token, res)
                }, function (error) {
                    res.json({
                        success: false,
                        message: StringConstants.Eng_Message.EmailServerFailed
                    })
                });
            }
        } else {
            res.json({
                success: false,
                message: StringConstants.Eng_Message.AuthenticationFaild
            })
        }
    }, error => {
        console.log(error);
    });
}


/**
 * First find the token in token table to check if user has already generated token, if token is there then update the token with new else push new token to table.
 * @param {*} user_id  User id for which token needs to be checked
 * @param {*} token  new token 
 * @param {*} res  responce object passed from parent funtion
 */
function checkEmailToken(user_id, token, res) {
    let options = {
        where: { user_id: user_id }
    }
    db.Tokens.findOne(options).then(result => {
        if (result) {
            updateToken(user_id, token, res)
        } else {
            addTokenDetails(user_id, token, res)
        }
    })
}
/**
 *  Add new token to token table 
 * @param {*} user_id  user id for which the token needs to be pushed.
 * @param {*} token  new token 
 * @param {*} res  reponse object passed from parent function
 */
function addTokenDetails(user_id, token, res) {

    var dataToInsert = {
        user_id: user_id,
        token: token,
        token_expiry: 500000,
        active: 1,
        created_at: new Date(),
        updated_at: new Date()
    };

    db.Tokens.create(dataToInsert).then(function (result) {
        console.log(result)
        res.json({
            success: true,
            message: StringConstants.Eng_Message.ResetEmailSent
        })

    }, function (error) {

        res.json({
            success: false,
            message: StringConstants.Eng_Message.GenericError
        })
    });
}

/**
 *  Update new token to token table 
 * @param {*} sub_id  user id for which the token needs to be pushed.
 * @param {*} token  new token 
 * @param {*} res  reponse object passed from parent function
 */
function updateToken(user_id, token, res) {
    var dataToUpdate = {
        token: token,
        token_expiry: 500000,
        active: 1,
        updated_at: new Date(),
    };

    let options = {
        where: { user_id: user_id }
    }

    db.Tokens.update(dataToUpdate, options)
        .then(result => {
            if (result) {
                res.json({
                    message: StringConstants.Eng_Message.ResetEmailSent,
                    success: true
                })

            } else {
                res.json({
                    message: "Check updateToken method in AuthenticationUser.js",
                    success: true
                })

            }
        })

}



/**
 *  set user status to active when activate user is hit 
 */
exports.activateUser = function (req, res) {

    var dataToUpdate = {
        status: 1
    };

    let options = {
        where: { user_id: req.query.user_id }
    }

    db.Users.update(dataToUpdate, options)
        .then(result => {
            if (result) {
                res.json({
                    success: true,
                    message: 'Activated...'
                })

            } else {
                res.json({
                    success: false,
                    message: StringConstants.Eng_Message.UnableToActivate
                })

            }
        })
}


/**
 * Check if token is expired or not if reset password url is hit
 */
exports.checkTokenValidity = function (req, res) {

    let options = {
        where: { token: req.query.token }
    }

    db.Tokens.findOne(options).then(result => {
        if (result) {
            res.redirect("http://localhost:3001/resetPassword#?token=" + req.query.token + "&user_id =" + result.user_id);
        } else {
            res.json({
                success: false,
                message: 'Token expired. Please try again and generate new request'
            })
        }
    })
}

/**
 * Updates the password when user comes from forget password flow.
 */
exports.updatePassword = function (req, res) {

    let options = {
        where: { token: req.query.token }
    }

    db.Tokens.findOne(options).then(result => {
        if (result) {

            if (result.active == 0) {
                console.log('Token invalid')
                res.json({
                    success: false,
                    message: 'Token expired. Please try again and generate new request'
                })

            } else {
                var dataToUpdate = {
                    password: req.body.password,
                };
                let options = {
                    where: { user_id: req.query.user_id }
                }

                db.Users.update(dataToUpdate, options)
                    .then(result => {
                        var dataToUpdate = {
                            active: 0
                        };
                        let options = {
                            where: { token: req.query.token }
                        }

                        db.Tokens.update(dataToUpdate, options);

                        let response = {
                            message: 'Password updated successfully',
                            success: true
                        }
                        res.send(response)
                    })

            }

        } else {
            res.json({
                success: false,
                message: 'Invalid token found. Please try again'
            })
        }
    })

}

/**
 * Update password when user is already logged in and want to restpassword , require old password with new password
 */
exports.updateUserPassword = function (req, res) {


    let options = {
        where: { user_id: req.body.user_id, }
    }

    db.Users.findOne(options).then(result => {
        if (result) {

            if (result[0].password != req.body.oldPassword) {
                console.log('Token invalid')
                res.json({
                    success: false,
                    message: 'The given password does not match with current password'
                })
                return;
            } else {

                var dataToUpdate = {
                    password: req.body.password,
                };
                let options = {
                    where: { user_id: req.query.user_id }
                }

                Users.update(dataToUpdate, options)
                    .then(result => {
                        let response = {
                            message: 'Password updated successfully',
                            success: true
                        }
                        res.send(response)
                    })
            }
        }
    })




}