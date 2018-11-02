var nodemailer = require('nodemailer')
const crypto = require('crypto')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '*****@gmail.com',
        pass: '*******'
    }
});

exports.sendVerifyEmailTokenEmail = function (req) {
    console.log("Sending reset email now ...");
    var url = 'http://localhost:3001';;//req.protocol + '://' + req.get('host')
    const buf = crypto.randomBytes(256)
    const token = buf.toString('hex')
    var mailOptions = {
        from: '*********@gmail.com',
        to: req.body.email,
        subject: 'Email verification',
        text: 'Click on following url  ' + url + '/api/auth/verifytoken?token=' + token
    }
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(token, info);
            }
        })
    });

}

exports.sendActivationEmail = function (req, res, user_id) {
    const buf = crypto.randomBytes(256)
    console.log(buf);
    var url = req.protocol + '://' + req.get('host')
    const token = buf.toString('hex')
    console.log(token)

    console.log("Token is" + token);

    var mailOptions = {
        from: 'healthprismimpetus@gmail.com',
        to: req.body.email,
        subject: 'Activate account',
        text: 'Click on following url ' + url + '/api/auth/activate?token=' + token + "&user_id=" + user_id
    }

    console.log("Mail Option " + mailOptions);

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully")
        }
    })
}

