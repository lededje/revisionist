import { send } from 'micro';
import pick from 'lodash/pick';

import { getUser } from '../../utils/auth';

export default async (req, res) => {
  let user;
  try {
    user = await getUser(req, res);
  } catch (e) {
    send(res, 404, {});
    return;
  }

  send(res, 200, pick(user, ['id', 'name', 'email']));
};
