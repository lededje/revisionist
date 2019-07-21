const crypto = require('crypto');
const proxyaddr = require('proxy-addr');
const moment = require('moment');
const cookie = require('cookie');
const words = require('./words');

const createAuthExpiry = () => moment
  .utc()
  .add(30, 'days')
  .toISOString();

const createAuthInstance = (req, { autoVerify = false }) => {
  if (!req) throw new Error('Creating a new auth instance requires a req to look up the ip');
  return {
    accessToken: Buffer.from(crypto.randomBytes(24)).toString('hex'),
    verificationToken: autoVerify ? null : undefined,
    expiry: autoVerify ? createAuthExpiry() : null,
    ipAddress: req ? proxyaddr(req, addr => addr === '127.0.0.1') : null,
    verifiedAt: autoVerify ? Date.now() : null,
  };
};

const verifyAuthInstance = model => model.update({
  expiry: createAuthExpiry(),
  verifiedAt: moment().toISOString(),
});

const secureCookie = (key, value) => cookie.serialize(key, value, {
  expires: value === null ? Date.now() : undefined,
  httpOnly: true,
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
});

const authIsValid = ({ verifiedAt, revokedAt, expiry }) => moment.utc(expiry).isAfter(moment.utc()) && verifiedAt !== null && revokedAt === null;
const createWordCode = () => words(4).join(' ');

module.exports = {
  createAuthInstance,
  verifyAuthInstance,
  secureCookie,
  authIsValid,
  createWordCode,
};
