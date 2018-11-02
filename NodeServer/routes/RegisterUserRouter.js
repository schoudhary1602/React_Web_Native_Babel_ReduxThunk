var express = require('express')
var router = express.Router()
var registerCntr = require('../controller/RegisterController')
router.post('/registerUser',registerCntr.registerUrs)
router.post('/getprofile', registerCntr.getPrfileDetails)
router.post('/updateprofile', registerCntr.updateProfile)
module.exports = router
