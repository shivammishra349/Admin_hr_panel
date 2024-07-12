let Sequelize = require('sequelize');

let sequelize = new Sequelize('royals_webtech','root','shivam12',{
     dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize