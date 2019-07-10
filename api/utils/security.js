import crypto from 'crypto';
import proxyaddr from 'proxy-addr';
import moment from 'moment';
import cookie from 'cookie';
import words from './words';

const createAuthExpiry = () => moment
  .utc()
  .add(30, 'days')
  .toISOString();

export const createAuthInstance = (req, { autoVerify = false }) => {
  if (!req) throw new Error('Creating a new auth instance requires a req to look up the ip');
  return {
    accessToken: Buffer.from(crypto.randomBytes(24)).toString('hex'),
    verificationToken: autoVerify ? null : undefined,
    expiry: autoVerify ? createAuthExpiry() : null,
    ipAddress: req ? proxyaddr(req, addr => addr === '127.0.0.1') : null,
    verifiedAt: autoVerify ? Date.now() : null,
  };
};

export const verifyAuthInstance = model => model.update({
  expiry: createAuthExpiry(),
  verifiedAt: moment().toISOString(),
});

export const secureCookie = (key, value) => cookie.serialize(key, value, {
  expires: value === null ? Date.now() : undefined,
  httpOnly: true,
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
});

export const authIsValid = ({ verifiedAt, revokedAt, expiry }) => moment.utc(expiry).isAfter(moment.utc()) && verifiedAt !== null && revokedAt === null;
export const createWordCode = () => words(4).join(' ');
