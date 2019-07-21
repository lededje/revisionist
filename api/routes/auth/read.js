const { send } = require('micro');
const pick = require('lodash/pick');

const { getUser } = require('../../utils/auth');

module.exports = async (req, res) => {
  let user;
  try {
    user = await getUser(req, res);
  } catch (e) {
    send(res, 404, {});
    return;
  }

  send(res, 200, pick(user, ['id', 'name', 'email', 'verified']));
};
