import { json, send } from 'micro';
import pick from 'lodash/pick';

import { MALFORMED_JSON, INTERNAL_SERVER_ERROR } from '../../errors';

import auth from '../../utils/auth';

export default auth(async (req, res, user) => {
  let body;

  try {
    body = await json(req);
  } catch (e) {
    return send(res, 400, { error: MALFORMED_JSON });
  }

  let task;
  try {
    [task] = await user.getTasks({ where: { id: body.id } });
  } catch (error) {
    switch (true) {
      default:
        return send(res, 500, { error: INTERNAL_SERVER_ERROR });
    }
  }

  let updatedTask;
  try {
    updatedTask = await task.update({
      startTime: body.startTime || null,
      duration: body.duration || null,
      label: body.label,
    });
  } catch (error) {
    switch (true) {
      default:
        return send(res, 500, { error: INTERNAL_SERVER_ERROR });
    }
  }

  return send(res, 200, pick(updatedTask, ['id', 'startTime', 'duration', 'label']));
});
