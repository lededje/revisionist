import { send } from 'micro';

import { authIsValid, secureCookie } from './security';

import { Auth } from '../models';
import { ACCESS_TOKEN_MISSING, ACCESS_TOKEN_INVALID } from '../errors';

export const getUser = async (req) => {
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

export default next => async (req, res) => {
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
