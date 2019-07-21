const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { send } = require('micro');

const Sentry = require('./utils/sentry');
const { PATH_NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./errors');
const asyncMiddleware = require('./utils/asyncMiddleware');

const healthcheck = require('./routes/');
const account = require('./routes/account');
const auth = require('./routes/auth');
const task = require('./routes/task');
const activate = require('./routes/activate');

const app = express();
const logFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';
const port = process.env.PORT || 3000;

app.use(Sentry.Handlers.requestHandler());

app.use(morgan(logFormat));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.all('/', asyncMiddleware(healthcheck));
app.all('/account', asyncMiddleware(account));
app.all('/auth', asyncMiddleware(auth));
app.all('/task', asyncMiddleware(task));
app.all('/activate', asyncMiddleware(activate));

app.all('*', (req, res) => send(res, 404, { error: PATH_NOT_FOUND }));

app.use(Sentry.Handlers.errorHandler());

// all four arguments must be defined to disable default error handling
/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  send(res, 500, { error: INTERNAL_SERVER_ERROR, errorId: res.sentry });
});

app.listen(port);
