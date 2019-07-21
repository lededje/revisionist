const Sentry = require('@sentry/node');

const { SENTRY_DSN, SENTRY_ENVIRONMENT, SENTRY_RELEASE } = process.env;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
    release: SENTRY_RELEASE,
  });
}

module.exports = Sentry;
