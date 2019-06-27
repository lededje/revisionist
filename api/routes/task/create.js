import pick from 'lodash/pick';
import { json, send } from 'micro';

import { User } from '../../models';
import { MALFORMED_JSON, INTERNAL_SERVER_ERROR } from '../../errors';

export default async (req, res) => {
  let body;
  try {
    body = await json(req);
  } catch (e) {
    return send(res, 400, { error: MALFORMED_JSON });
  }

  let task;
  try {
    const user = await User.findByPk(1);

    task = await user.createTask({
      startTime: body.startTime,
      duration: body.duration,
      label: body.label,
    });
  } catch (error) {
    switch (true) {
      default:
        return send(res, 500, { error: INTERNAL_SERVER_ERROR });
    }
  }

  return send(res, 200, pick(task, ['id', 'startTime', 'duration', 'label']));
};
