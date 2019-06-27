import isDefined from 'lodash/isDefined';

import Auth from '../../models';

import { AUTH_HEADER_MISSING, UNABLE_TO_PARSE_AUTH_HEADER } from '../errors';

const isValid = ({ verifiedAt, revoked }) => isDefined(verifiedAt) && revoked === false;

export default async (req) => {
  if (!req.headers.authentication) {
    throw new Error(AUTH_HEADER_MISSING);
  }

  let accessToken;
  try {
    [, accessToken] = req.headers.authentication.match(/^[B|b]earer (.*)$/);
  } catch (e) {
    throw new Error(UNABLE_TO_PARSE_AUTH_HEADER);
  }

  const auth = await Auth.findOne({
    where: { accessToken },
  });

  if (isValid(auth)) {
    return auth.User;
  }

  return {};
};
