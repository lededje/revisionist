const Sequelize = require('sequelize');
const pg = require('pg');

const user = require('./user');
const task = require('./task');
const auth = require('./auth');

const {
  DB_HOST, DB_NAME, DB_USER, DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectModule: pg,

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const User = user.init(sequelize, Sequelize);
const Task = task.init(sequelize, Sequelize);
const Auth = auth.init(sequelize, Sequelize);

const models = {
  User,
  Task,
  Auth,
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  sequelize,
  User,
  Task,
  Auth,
};
