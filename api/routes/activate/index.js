import crud from '../../utils/crud';

import activate from './activate';
import withSentry from '../../utils/withSentry';

export default withSentry(
  crud({
    patch: activate,
  }),
);
