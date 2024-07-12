const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

let userSignup = async (req,res)=>{
    try{
        let name= req.body.name;
        let email= req.body.email;
        let password= req.body.password;
        let position= req.body.position;
        let number = req.body.number
        
        
        console.log(name , email,password,position ,number)
    
        bcrypt.hash(password , 10 , async(err,hash)=>{

        console.log(err)
        await User.create({name,email,password:hash,position,number})
        res.status(200).json({message:'user created successfully'})
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'interval server error'})
    }
   

}

const generateAccessToken= (id,name)=>{
    return jwt.sign({userId: id, name: name} , process.env.SECRET_KEY)
}


const LoginUser=async (req,res,next)=>{
    try {
        let email = req.body.email;
        let password = req.body.password;

        let user = await User.findOne({
            where: {
                email: email,
            }
        });

        if (user) {  
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Something went wrong' });
                }
                if (result) { 
                    let token = generateAccessToken(user.id, user.name);
                    res.status(200).json({
                        user: user,
                        message: 'User logged in successfully',
                        token: token,
                        position: user.position 
                    });
                }  
                else{
                    res.status(400).json({message:'username or password is incorrect'})
                }
            });

        } 
        else { 
            res.status(404).json({ message: 'User name or password incorrect' });
        }
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = {
    userSignup,
    generateAccessToken,
    LoginUser
}