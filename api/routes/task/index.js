const crud = require('../../utils/crud');
const create = require('./create');
const read = require('./read');
const patch = require('./patch');
const deleteRoute = require('./delete');

module.exports = crud({
  create,
  read,
  delete: deleteRoute,
  patch,
});
