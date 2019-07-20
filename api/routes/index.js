import { send } from 'micro';

import packageJson from '../package.json';
import { sequelize } from '../models';
import withSentry from '../utils/withSentry';

export default withSentry(async (req, res) => {
  let databaseConnection;
  try {
    await sequelize.authenticate();
    databaseConnection = true;
  } catch (e) {
    databaseConnection = false;
  }

  send(res, 200, { version: packageJson.version, databaseConnection });
});
