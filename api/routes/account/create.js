const { json, send } = require('micro');
const pick = require('lodash/pick');
const { UniqueConstraintError } = require('sequelize');

const hostname = require('../../utils/hostname');
const { User } = require('../../models');
const { UNIQUE_CONSTRAINT_ERROR, MALFORMED_JSON } = require('../../errors');
const email = require('../../utils/email');

module.exports = async (req, res) => {
  let body;

  try {
    body = await json(req);
  } catch (e) {
    return send(res, 400, { error: MALFORMED_JSON });
  }

  let newUser;
  try {
    newUser = await User.create({ name: body.name, email: body.email });
  } catch (error) {
    switch (true) {
      case error instanceof UniqueConstraintError:
        return send(res, 400, { error: UNIQUE_CONSTRAINT_ERROR });
      default:
        throw error;
    }
  }

  const verificationLink = hostname(`/activate/${newUser.verificationToken}`);

  await email({
    to: newUser.email,
    subject: 'Revisionist: Activate you account',
    text: `Hello ${newUser.name}\n\nPlease activate your account by visiting the link below.\n\n${verificationLink}\n\nThe Revisionist`,
    html: `<p>Hello ${newUser.name}</p><p>Please activate your account by clicking on the link below.</p><p><a href="${verificationLink}">${verificationLink}</a></p><p>The Revisionist</p>`,
  });

  return send(res, 200, pick(newUser, ['id', 'name', 'email']));
};
