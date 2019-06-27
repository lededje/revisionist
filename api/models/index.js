import Sequelize from 'sequelize';
import pg from 'pg';

import user from './user';
import task from './task';
import auth from './auth';

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

export const User = user.init(sequelize, Sequelize);
export const Task = task.init(sequelize, Sequelize);
export const Auth = auth.init(sequelize, Sequelize);

const models = {
  User,
  Task,
  Auth,
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

export { sequelize };
