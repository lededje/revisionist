import { send } from 'micro';
import { DatabaseError } from 'sequelize';

import { User } from '../../models';
import {
  VERIFICATION_TOKEN_NOT_FOUND,
  INVALID_VERIFICATION_TOKEN,
  INTERNAL_SERVER_ERROR,
} from '../../errors';

export default async (req, res) => {
  const { verificationToken } = req.query;

  if (!verificationToken) {
    send(res, 404, { error: VERIFICATION_TOKEN_NOT_FOUND });
    return;
  }

  let user;
  try {
    user = await User.findOne({
      where: { verificationToken },
    });
  } catch (error) {
    switch (true) {
      case error instanceof DatabaseError: {
        send(res, 400, { error: INVALID_VERIFICATION_TOKEN });
        return;
      }
      default: {
        send(res, 500, { error: INTERNAL_SERVER_ERROR });
        return;
      }
    }
  }

  if (!user) {
    send(res, 404, { error: VERIFICATION_TOKEN_NOT_FOUND });
    return;
  }

  await user.update({
    verified: true,
  });

  send(res, 204);
};
