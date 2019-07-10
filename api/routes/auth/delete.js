import { send } from 'micro';

import secureCookie from '../../utils/security';

import { Auth } from '../../models';

export default async (req, res) => {
  const cookies = req.cookie;

  const auth = await Auth.findOne({
    accessToken: cookies.accessToken,
  });

  await auth.update({ revokedAt: Date.now() });

  res.setHeader('Set-Cookie', secureCookie('accessToken', null));

  send(res, 204);
};
