const pick = require('lodash/pick');
const { json, send } = require('micro');

const { MALFORMED_JSON } = require('../../errors');

const auth = require('../../utils/auth');

module.exports = auth(async (req, res, user) => {
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
