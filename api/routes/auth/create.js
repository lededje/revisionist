import crypto from 'crypto';
import { send, json } from 'micro';
import proxyaddr from 'proxy-addr';

import { USER_NOT_FOUND, MALFORMED_JSON } from '../../errors';
import { User } from '../../models';
import sendEmail from '../../utils/email';
import words from '../../utils/words';

export default async (req, res) => {
  let body;
  try {
    body = await json(req);
  } catch (e) {
    send(res, 400, { error: MALFORMED_JSON });
    return;
  }

  const { email } = body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    send(res, 404, { error: USER_NOT_FOUND });
    return;
  }

  const accessToken = crypto.randomBytes(24).toString('hex');
  const ipAddress = proxyaddr(req, addr => addr === '127.0.0.1');

  const auth = await user.createAuth({
    accessToken,
    ipAddress,
  });

  const randomWords = words(4).join(' ');

  const link = `https://revisionist.miles.dev/auth/${auth.verificationToken}`;

  await sendEmail({
    to: user.email,
    subject: `Revisionist Login Verification (code: "${randomWords}")`,
    text: `Hello ${user.name}\n\nWe have recieved a login attempt with the following code: "${randomWords}"\n\nTo complete the login process, please visit ${link}.\n\nThe Revisionist`,
    html: `<p>Hello ${user.name}</p><p>We have recieved a login attempt with the following code: "${randomWords}"</p><p>To complete the login process, please visit <a href="${link}">${link}</a>.</p><p>The Revisionist</p>`,
  });

  send(res, 200, { code: randomWords, ipAddress });
};
