let express = require('express')

let routes = express.Router()

let controller = require('../controller/hr')

let Authentication = require('../authentication/auth')

routes.post('/addUser',Authentication.authenticate,controller.addUser)

module.exports = routes