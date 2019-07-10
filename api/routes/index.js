import { send } from 'micro';

import { sequelize } from '../models';

import packageJson from '../package.json';

export default async (req, res) => {
  let databaseConnection;
  try {
    await sequelize.authenticate();
    databaseConnection = true;
  } catch (e) {
    databaseConnection = false;
  }

  send(res, 200, { version: packageJson.version, databaseConnection });
};
