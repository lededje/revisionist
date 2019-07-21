const crud = require('../../utils/crud');

const read = require('./read');
const create = require('./create');
const patch = require('./verify');
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
