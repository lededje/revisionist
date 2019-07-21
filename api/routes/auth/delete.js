const { send } = require('micro');

const secureCookie = require('../../utils/security');

const { Auth } = require('../../models');

module.exports = async (req, res) => {
  const cookies = req.cookie;

  const auth = await Auth.findOne({
    accessToken: cookies.accessToken,
  });

  await auth.update({ revokedAt: Date.now() });

  res.setHeader('Set-Cookie', secureCookie('accessToken', null));

  send(res, 204);
};
