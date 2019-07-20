import { send } from 'micro';

import { INTERNAL_SERVER_ERROR } from '../../errors';

import auth from '../../utils/auth';

export default auth(async (req, res, user) => {
  let tasks;
  try {
    tasks = await user.getTasks({
      attributes: ['id', 'startTime', 'duration', 'label'],
    });
  } catch (error) {
    switch (true) {
      default:
        return send(res, 500, { error: INTERNAL_SERVER_ERROR });
    }
  }

  return send(res, 200, { tasks });
});
