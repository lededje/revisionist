import { json, send } from 'micro';
import pick from 'lodash/pick';

import { MALFORMED_JSON } from '../../errors';

import auth from '../../utils/auth';

export default auth(async (req, res, user) => {
  let body;

  try {
    body = await json(req);
  } catch (e) {
    return send(res, 400, { error: MALFORMED_JSON });
  }

  const [task] = await user.getTasks({ where: { id: body.id } });

  const updatedTask = await task.update({
    startTime: body.startTime || null,
    duration: body.duration || null,
    label: body.label,
  });

  return send(res, 200, pick(updatedTask, ['id', 'startTime', 'duration', 'label']));
});
