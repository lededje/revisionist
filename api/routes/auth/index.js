import crud from '../../utils/crud';

import read from './read';
import create from './create';
import patch from './verify';
import deleteRoute from './delete';

export default crud({
  create,
  read,
  delete: deleteRoute,
  patch,
});
