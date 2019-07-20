import { send } from 'micro';

import auth from '../../utils/auth';

export default auth(async (req, res, user) => {
  const tasks = await user.getTasks({
    attributes: ['id', 'startTime', 'duration', 'label'],
  });

  return send(res, 200, { tasks });
});
