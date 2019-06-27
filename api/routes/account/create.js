import pick from 'lodash/pick';
import { json, send } from 'micro';

import { UniqueConstraintError } from 'sequelize';

import { User } from '../../models';
import { UNIQUE_CONSTRAINT_ERROR, MALFORMED_JSON, INTERNAL_SERVER_ERROR } from '../../errors';

import email from '../../utils/email';

export default async (req, res) => {
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
        return send(res, 500, { error: INTERNAL_SERVER_ERROR });
    }
  }

  const verificationLink = `https://revisionist.miles.dev/activate/${newUser.verificationToken}`;

  await email({
    to: newUser.email,
    subject: 'Revisionist: Activate you account',
    text: `Hello ${newUser.name}\n\nPlease activate your account by visiting the link below.\n\n${verificationLink}\n\nThe Revisionist`,
    html: `<p>Hello ${newUser.name}</p><p>Please activate your account by clicking on the link below.</p><p><a href="${verificationLink}">${verificationLink}<a/></p><p>The Revisionist</p>`,
  });

  return send(res, 200, pick(newUser, ['id', 'name', 'email']));
};
