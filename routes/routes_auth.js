var express = require('express')
var router = express.Router()

var AdminController = require('../controller/admin_controller')

router.post('/login', AdminController.login)
router.post('/registration', AdminController.registration)

module.exports = router