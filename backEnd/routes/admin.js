let express = require('express')

let routes = express.Router()

let controller = require('../controller/admin')

let Authentication = require('../authentication/auth')

routes.get('/getUser',Authentication.authenticate,controller.getUser)

routes.delete('/deleteUser/:id', Authentication.authenticate,controller.deleteUser)

routes.put('/updateUser/:id', Authentication.authenticate , controller.updateUser)

module.exports = routes