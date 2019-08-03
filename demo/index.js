const { send } = require('micro');

module.exports = (req, res) => {
  send(res, 200, { test_parameter: process.env.test_parameter });
};
