import crud from '../../utils/crud';
import create from './create';
import deleteRoute from './delete';

export default crud({ create, delete: deleteRoute });
