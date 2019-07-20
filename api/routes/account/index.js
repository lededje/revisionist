import crud from '../../utils/crud';

import create from './create';

import withSentry from '../../utils/withSentry';

export default withSentry(
  crud({
    create,
  }),
);
