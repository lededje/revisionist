const crud = require('../../utils/crud');

const read = require('./read');
const create = require('./create');
const patch = require('./verify');
const deleteRoute = require('./delete');

module.exports = crud({
  create,
  read,
  delete: deleteRoute,
  patch,
});
