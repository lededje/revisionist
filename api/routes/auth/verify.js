import { send } from 'micro';
import { DatabaseError } from 'sequelize';
import Cookies from 'cookies';
import moment from 'moment';

import { Auth } from '../../models';

import {
  VERIFICATION_TOKEN_EXPIRED,
  VERIFICATION_TOKEN_NOT_FOUND,
  INVALID_VERIFICATION_TOKEN,
  INTERNAL_SERVER_ERROR,
} from '../../errors';

export default async (req, res) => {
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
        send(res, 500, { error: INTERNAL_SERVER_ERROR });
        return;
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

  const expiry = moment
    .utc()
    .add(30, 'days')
    .toISOString();

  const verifiedAuth = await auth.update({
    expiry,
    verifiedAt: moment().toISOString(),
  });

  const cookies = new Cookies(req, res);

  cookies.set('accessToken', verifiedAuth.accessToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    overwrite: true,
  });

  send(res, 204);
};
