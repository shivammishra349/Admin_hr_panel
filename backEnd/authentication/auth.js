let User = require('../models/user');

let jwt = require('jsonwebtoken')

require('dotenv').config()


exports.authenticate = (req,res,next)=>{
    try{
        let token = req.header('Authorization');
    
        let user = jwt.verify(token, process.env.SECRET_KEY)
    
        User.findByPk(user.userId).then((user)=>{
            req.user = user
            next()
        })
    }
    catch(err){
        console.log(err);
        res.status(401).json({seccess:'false'})
    }

}

