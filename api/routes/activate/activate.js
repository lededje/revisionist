const { send } = require('micro');
const { DatabaseError } = require('sequelize');

const { User } = require('../../models');
const {
  VERIFICATION_TOKEN_NOT_FOUND,
  INVALID_VERIFICATION_TOKEN,
  USER_ALREADY_VERIFIED,
} = require('../../errors');

const { createAuthInstance, secureCookie } = require('../../utils/security');

module.exports = async (req, res) => {
  const { verificationToken } = req.query;

  if (!verificationToken) {
    send(res, 404, { error: VERIFICATION_TOKEN_NOT_FOUND });
    return;
  }

  let user;
  try {
    user = await User.findOne({
      where: { verificationToken },
    });
  } catch (error) {
    switch (true) {
      case error instanceof DatabaseError: {
        send(res, 400, { error: INVALID_VERIFICATION_TOKEN });
        return;
      }
      default: {
        throw error;
      }
    }
  }

  if (!user) {
    send(res, 404, { error: VERIFICATION_TOKEN_NOT_FOUND });
    return;
  }

  if (user.verified) {
    send(res, 400, { error: USER_ALREADY_VERIFIED });
    return;
  }

  await user.update({
    verified: true,
  });

  const auth = createAuthInstance(req, {
    autoVerify: true,
  });

  await user.createAuth(auth);

  res.setHeader('Set-Cookie', secureCookie('accessToken', auth.accessToken));

  send(res, 204);
};
