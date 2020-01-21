const Sequelize = require('sequelize');

module.exports = new Sequelize('sequelize', 'root', 'root', {
    host:'localhost',
    port: '8889', 
    dialect: 'mysql',
    operatorsAliases: false,

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
});