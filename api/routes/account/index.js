const crud = require('../../utils/crud');

const create = require('./create');

const withSentry = require('../../utils/withSentry');

module.exports = withSentry(
  crud({
    create,
  }),
);
