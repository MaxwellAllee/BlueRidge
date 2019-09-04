'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const mysql2 = 'mysql2'; 
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
let config ={}
const db = {};
if(process.env.LOCAL){
  console.log("local")
  config ={"username" : process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": "mysql",
    'dialectModule': mysql2,
    "operatorsAliases": false}
}else{
  console.log("foreign")
 config = require(__dirname + '/../config/config.json')[env];
}
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
