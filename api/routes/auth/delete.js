import { send } from 'micro';

import Cookies from 'cookies';

import { Auth } from '../../models';

export default async (req, res) => {
  const cookies = Cookies(req, res);

  const auth = await Auth.findOne({
    accessToken: cookies.get('accessToken'),
  });

  await auth.update({ revokedAt: Date.now() });

  cookies.set('accessToken');

  send(res, 204);
};
