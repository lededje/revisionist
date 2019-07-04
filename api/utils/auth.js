import Cookies from 'cookies';
import moment from 'moment';
import { send } from 'micro';

import { Auth } from '../models';
import { ACCESS_TOKEN_MISSING, ACCESS_TOKEN_INVALID } from '../errors';

const isValid = ({ verifiedAt, revoked, expiry }) => moment.utc(expiry).isAfter(moment.utc()) && verifiedAt !== null && revoked === false;

export default next => async (req, res) => {
  const cookies = Cookies(req, res);

  const accessToken = cookies.get('accessToken');

  if (!accessToken) {
    send(res, 401, { data: ACCESS_TOKEN_MISSING });
    return;
  }

  const auth = await Auth.findOne({
    where: { accessToken },
  });

  if (!isValid(auth)) {
    cookies.set('accessToken');

    send(res, 401, { data: ACCESS_TOKEN_INVALID });
    return;
  }

  const user = await auth.getUser();

  await next(req, res, user);
};
