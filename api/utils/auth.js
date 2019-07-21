const { send } = require('micro');

const { authIsValid, secureCookie } = require('./security');

const { Auth } = require('../models');
const { ACCESS_TOKEN_MISSING, ACCESS_TOKEN_INVALID } = require('../errors');

const getUser = async (req) => {
  const { cookies } = req;
  const { accessToken } = cookies;

  if (!accessToken) {
    const error = new Error();
    error.reason = ACCESS_TOKEN_MISSING;
    throw error;
  }

  const auth = await Auth.findOne({
    where: { accessToken },
  });

  if (!authIsValid(auth)) {
    const error = new Error();
    error.reason = ACCESS_TOKEN_INVALID;
    throw error;
  }

  return auth.getUser();
};

const auth = next => async (req, res) => {
  let user;
  try {
    user = await getUser(req, res);
  } catch (e) {
    switch (e.reason) {
      case ACCESS_TOKEN_MISSING: {
        send(res, 401, { data: ACCESS_TOKEN_MISSING });
        return;
      }
      case ACCESS_TOKEN_INVALID: {
        res.setHeader('Set-Cookie', secureCookie('accessToken', null));

        send(res, 401, { data: ACCESS_TOKEN_INVALID });
        return;
      }
      default: {
        throw e;
      }
    }
  }

  await next(req, res, user);
};

auth.getUser = getUser;

module.exports = auth;
