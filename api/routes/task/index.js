const crud = require('../../utils/crud');
const create = require('./create');
const read = require('./read');
const patch = require('./patch');
const deleteRoute = require('./delete');

const withSentry = require('../../utils/withSentry');

module.exports = withSentry(
  crud({
    create,
    read,
    delete: deleteRoute,
    patch,
  }),
);
