import crud from '../../utils/crud';
import create from './create';
import read from './read';
import patch from './patch';
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
