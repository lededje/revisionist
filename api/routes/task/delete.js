import { send, json } from 'micro';

import auth from '../../utils/auth';

import { MALFORMED_JSON, TASK_NOT_FOUND } from '../../errors';

export default auth(async (req, res, user) => {
  let body;
  try {
    body = await json(req);
  } catch (e) {
    send(res, 400, { error: MALFORMED_JSON });
    return;
  }

  const [task] = await user.getTasks({
    where: { id: body.id },
  });

  try {
    await task.destroy();
  } catch (e) {
    send(res, 404, { error: TASK_NOT_FOUND });
    return;
  }

  send(res, 204);
});
