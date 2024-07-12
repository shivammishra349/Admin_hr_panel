let express = require('express');

let routes = express.Router();

let controller = require('../controller/users')

let Authentication = require('../authentication/auth')

routes.post('/signUp',controller.userSignup);

routes.post('/login',controller.LoginUser)

module.exports = routes