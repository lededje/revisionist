const crud = require('../../utils/crud');

const activate = require('./activate');
const withSentry = require('../../utils/withSentry');

module.exports = withSentry(
  crud({
    patch: activate,
  }),
);
