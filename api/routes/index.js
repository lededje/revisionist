import { send } from 'micro';

import packageJson from '../package.json';

export default async (req, res) => {
  send(res, 200, { version: packageJson.version });
};
