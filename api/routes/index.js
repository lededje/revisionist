const { send } = require('micro');

const packageJson = require('../package.json');

module.exports = async (req, res) => {
  send(res, 200, { version: packageJson.version });
};
