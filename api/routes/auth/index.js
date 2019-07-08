import crud from '../../utils/crud';

import read from './read';
import create from './create';
import patch from './verify';

export default crud({
  create,
  read,
  patch,
});
