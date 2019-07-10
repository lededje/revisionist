import Cookies from 'cookies';
import moment from 'moment';
import { send } from 'micro';

import { Auth } from '../models';
import { ACCESS_TOKEN_MISSING, ACCESS_TOKEN_INVALID } from '../errors';

const isValid = ({ verifiedAt, revokedAt, expiry }) => moment.utc(expiry).isAfter(moment.utc()) && verifiedAt !== null && revokedAt === null;

export const getUser = async (req) => {
  const cookies = Cookies(req);

  const accessToken = cookies.get('accessToken');

  if (!accessToken) {
    const error = new Error();
    error.reason = ACCESS_TOKEN_MISSING;
    throw error;
  }

  const auth = await Auth.findOne({
    where: { accessToken },
  });

  if (!isValid(auth)) {
    const error = new Error();
    error.reason = ACCESS_TOKEN_INVALID;
    throw error;
  }

  return auth.getUser();
};

export default next => async (req, res) => {
  let user;
  try {
    user = getUser(req, res);
  } catch (e) {
    switch (e.reason) {
      case ACCESS_TOKEN_MISSING: {
        send(res, 401, { data: ACCESS_TOKEN_MISSING });
        return;
      }
      case ACCESS_TOKEN_INVALID: {
        const cookies = Cookies(req, res);
        cookies.set('accessToken');

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
