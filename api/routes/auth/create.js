import { send, json } from 'micro';

import { USER_NOT_FOUND, MALFORMED_JSON, EXPECTED_VALUES_MISSING } from '../../errors';
import { User } from '../../models';
import sendEmail from '../../utils/email';
import { createAuthInstance, createWordCode } from '../../utils/security';

export default async (req, res) => {
  let body;
  try {
    body = await json(req);
  } catch (e) {
    send(res, 400, { error: MALFORMED_JSON });
    return;
  }

  const { email } = body;

  if (!email) {
    send(res, 400, { error: EXPECTED_VALUES_MISSING });
    return;
  }

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    send(res, 404, { error: USER_NOT_FOUND });
    return;
  }

  const auth = await user.createAuth(createAuthInstance(req));

  const randomWords = createWordCode();

  const link = `https://revisionist.miles.dev/auth/${auth.verificationToken}`;

  await sendEmail({
    to: user.email,
    subject: `Revisionist Login Verification (code: "${randomWords}")`,
    text: `Hello ${user.name}\n\nWe have recieved a login attempt with the following code: "${randomWords}"\n\nTo complete the login process, please visit ${link}.\n\nThe Revisionist`,
    html: `<p>Hello ${user.name}</p><p>We have recieved a login attempt with the following code: "${randomWords}"</p><p>To complete the login process, please visit <a href="${link}">${link}</a>.</p><p>The Revisionist</p>`,
  });

  send(res, 200, { code: randomWords, ipAddress: auth.ipAddress });
};
