const { send } = require('micro');

const auth = require('../../utils/auth');

module.exports = auth(async (req, res, user) => {
  const tasks = await user.getTasks({
    attributes: ['id', 'startTime', 'duration', 'label'],
  });

  return send(res, 200, { tasks });
});
