const { json, send } = require('micro');
const pick = require('lodash/pick');

const { MALFORMED_JSON } = require('../../errors');

const auth = require('../../utils/auth');

module.exports = auth(async (req, res, user) => {
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
