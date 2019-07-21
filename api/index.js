const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { send } = require('micro');

const logFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';

const { PATH_NOT_FOUND } = require('./errors');

const healthcheck = require('./routes/');
const account = require('./routes/account');
const auth = require('./routes/auth');
const task = require('./routes/task');
const activate = require('./routes/activate');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan(logFormat));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.all('/', healthcheck);
app.all('/account', account);
app.all('/auth', auth);
app.all('/task', task);
app.all('/activate', activate);
app.all('*', (req, res) => send(res, 404, { error: PATH_NOT_FOUND }));

app.listen(port);
