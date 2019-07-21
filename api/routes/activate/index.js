const crud = require('../../utils/crud');

const activate = require('./activate');

module.exports = crud({
  patch: activate,
});
