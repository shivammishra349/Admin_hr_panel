    let User = require('../models/user');


const getUser = async (req,res) =>{
    try{
        let users = await User.findAll()
        res.status(200).json({user :users,message:'users get successfully'})
    }
    catch(err){
        console.log(err)
    }
        
}

const updateUser =async (req,res) =>{

        
    let {id} = req.params;
    let {name,email ,position,number} = req.body;
    number = String(number);

    console.log('Incoming number:', req.body.number);
    console.log('Parsed number:', number);
        
    try{
        let user = await User.findOne({where:{id:id}})

        if (user) {
            user.name = name;
            user.email = email;
            user.position = position;
            user.number = number;

            await user.save();

            res.status(200).json({ message: 'User updated successfully', user: user });
        } 
        else {
            res.status(404).json({ message: 'User not found' });
        }
     }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Internal server error'})
    }
        
}

const deleteUser = async (req,res)=>{
    try
    {
        let {id} = req.params;

        let user = await User.findOne({where:{id:id}});
        console.log(user.position)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(user.position==='Admin'){
            return res.status(408).json({message:'Sorry, admin cannot remove by anyone'})
        }
        
        await user.destroy({where:{id:id}})
        res.status(200).json({ message: 'User deleted successfully' });

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'internal server error'})
    }
    
}
module.exports={
    getUser,
    deleteUser,
    updateUser
}