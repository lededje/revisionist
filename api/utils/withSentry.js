import * as Sentry from '@sentry/node';

const { SENTRY_API_DSN } = process.env;

if (SENTRY_API_DSN) {
  Sentry.init({
    dsn: SENTRY_API_DSN,
  });
}

export default route => async (ctx) => {
  try {
    await route.call(ctx);
  } catch (e) {
    if (SENTRY_API_DSN) {
      Sentry.captureException(e);
      return;
    }
    console.error(e);
  }
};
