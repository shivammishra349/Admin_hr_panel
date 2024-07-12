let Sequelize = require('sequelize');

let sequelize = require('../connection/database')

let User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    position:{
        type: Sequelize.ENUM,
        values: ['admin', 'hr', 'employee'],
        defaultValue: 'employee',
        allowNull:false
    },
   

})

module.exports=User