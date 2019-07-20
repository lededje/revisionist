import * as Sentry from '@sentry/node';

import { send } from 'micro';

import { INTERNAL_SERVER_ERROR } from '../errors';

const { SENTRY_API_DSN } = process.env;

if (SENTRY_API_DSN) {
  Sentry.init({
    dsn: SENTRY_API_DSN,
  });
}

export default route => async (ctx) => {
  try {
    await route.apply(ctx);
  } catch (e) {
    if (SENTRY_API_DSN) {
      Sentry.captureException(e);
      return;
    }
    console.error(e);
    send(ctx.res, 500, { error: INTERNAL_SERVER_ERROR });
  }
};
