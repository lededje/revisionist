import crud from '../../utils/crud';

import activate from './activate';

export default crud({
  patch: activate,
});
