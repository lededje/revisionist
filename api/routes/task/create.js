import pick from 'lodash/pick';
import { json, send } from 'micro';

import { MALFORMED_JSON } from '../../errors';

import auth from '../../utils/auth';

export default auth(async (req, res, user) => {
  let body;

  try {
    body = await json(req);
  } catch (e) {
    return send(res, 400, { error: MALFORMED_JSON });
  }

  const task = await user.createTask({
    startTime: body.startTime,
    duration: body.duration,
    label: body.label,
  });

  return send(res, 200, pick(task, ['id', 'startTime', 'duration', 'label']));
});
