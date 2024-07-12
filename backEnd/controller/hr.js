let User = require('../models/user');
const bcrypt = require('bcrypt')

const addUser = async (req,res) =>{
    try{
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        let number = req.body.number
        let position = req.body.position
        console.log(name)

        
        let user = await User.findOne({where:{email:email}});
        if(user){
        res.status(409).json({message:'User already exist with this email'})
        }

        bcrypt.hash(password , 10 , async(err,hash)=>{
            console.log(err)
            let newUser=await User.create({name,email,password:hash,number,position})
            res.status(200).json({user:newUser,message:'user added successfully'})
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Internal server error'})
    }
   
}

module.exports={
    addUser,
}