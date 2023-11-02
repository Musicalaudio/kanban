import express from 'express';

import authentication from './authentication.ts';
import users from './users.ts';
import boards from './boards.ts';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  boards(router);

  return router;
};
