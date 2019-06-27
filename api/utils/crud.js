import { send } from 'micro';

import { INVALID_METHOD } from '../errors';

export const invalidMethod = (req, res) => send(res, 405, { error: INVALID_METHOD });

export default ({
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
