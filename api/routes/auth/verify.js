const { send } = require('micro');
const { DatabaseError } = require('sequelize');
const moment = require('moment');

const { Auth } = require('../../models');

const { secureCookie, verifyAuthInstance } = require('../../utils/security');

const {
  VERIFICATION_TOKEN_EXPIRED,
  VERIFICATION_TOKEN_NOT_FOUND,
  INVALID_VERIFICATION_TOKEN,
} = require('../../errors');

module.exports = async (req, res) => {
  const { verificationToken } = req.query;

  if (!verificationToken) {
    send(res, 404, { error: VERIFICATION_TOKEN_NOT_FOUND });
    return;
  }

  let auth;
  try {
    auth = await Auth.findOne({
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

  if (!auth) {
    send(res, 404, { error: VERIFICATION_TOKEN_NOT_FOUND });
    return;
  }

  if (
    auth.verifiedAt !== null
    || moment(auth.createdAt)
      .add(12, 'hours')
      .isBefore(moment())
    || auth.revoked
  ) {
    send(res, 406, { error: VERIFICATION_TOKEN_EXPIRED });
    return;
  }

  const verifiedAuth = await verifyAuthInstance(auth);

  res.setHeader('Set-Cookie', secureCookie('accessToken', verifiedAuth.accessToken));

  send(res, 204);
};
