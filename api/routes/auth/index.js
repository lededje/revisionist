import crud from '../../utils/crud';

import read from './read';
import create from './create';
import patch from './verify';
import deleteRoute from './delete';

import withSentry from '../../utils/withSentry';

export default withSentry(
  crud({
    create,
    read,
    delete: deleteRoute,
    patch,
  }),
);
