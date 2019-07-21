const Sentry = require('@sentry/node');

const { send } = require('micro');

const { INTERNAL_SERVER_ERROR } = require('../errors');

const { SENTRY_API_DSN } = process.env;

if (SENTRY_API_DSN) {
  Sentry.init({
    dsn: SENTRY_API_DSN,
  });
}

module.exports = route => async (req, res, ...rest) => {
  try {
    await route.apply(null, [req, res, ...rest]);
  } catch (e) {
    if (SENTRY_API_DSN) {
      Sentry.captureException(e);
      return;
    }
    console.error(e);
    send(res, 500, { error: INTERNAL_SERVER_ERROR });
  }
};
