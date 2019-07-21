const { send, json } = require('micro');

const { USER_NOT_FOUND, MALFORMED_JSON, EXPECTED_VALUES_MISSING } = require('../../errors');
const { User } = require('../../models');
const sendEmail = require('../../utils/email');
const { createAuthInstance, createWordCode } = require('../../utils/security');

const hostname = require('../../utils/hostname');

module.exports = async (req, res) => {
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

  const link = hostname(`/auth/${auth.verificationToken}`);

  await sendEmail({
    to: user.email,
    subject: `Revisionist Login Verification (code: "${randomWords}")`,
    text: `Hello ${user.name}\n\nWe have recieved a login attempt with the following code: "${randomWords}"\n\nTo complete the login process, please visit ${link}.\n\nThe Revisionist`,
    html: `<p>Hello ${user.name}</p><p>We have recieved a login attempt with the following code: "${randomWords}"</p><p>To complete the login process, please visit <a href="${link}">${link}</a>.</p><p>The Revisionist</p>`,
  });

  send(res, 200, { code: randomWords, ipAddress: auth.ipAddress });
};
