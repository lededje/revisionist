const { send } = require('micro');

const { INVALID_METHOD } = require('../errors');

const invalidMethod = (req, res) => send(res, 405, { error: INVALID_METHOD, method: req.method, url: req.url });

const crud = ({
  create = invalidMethod,
  read = invalidMethod,
  update = invalidMethod,
  patch = invalidMethod,
  delete: deleteMethod = invalidMethod,
}) => async (req, res) => {
  switch (req.method) {
    case 'POST':
      return create(req, res);
    case 'GET':
      return read(req, res);
    case 'PUT':
      return update(req, res);
    case 'PATCH':
      return patch(req, res);
    case 'DELETE':
      return deleteMethod(req, res);
    default:
      return invalidMethod(req, res);
  }
};

crud.invalidMethod = invalidMethod;

module.exports = crud;
