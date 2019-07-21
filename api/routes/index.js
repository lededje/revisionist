const { send } = require('micro');

const packageJson = require('../package.json');
const { sequelize } = require('../models');

module.exports = async (req, res) => {
  let databaseConnection;
  try {
    await sequelize.authenticate();
    databaseConnection = true;
  } catch (e) {
    databaseConnection = false;
  }

  send(res, 200, { version: packageJson.version, databaseConnection });
};
