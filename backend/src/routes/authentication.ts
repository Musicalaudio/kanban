import express from 'express';

import { login, register, loggedIn } from '../controllers/authentication.ts';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
  router.post('/auth/loggedIn', loggedIn);
};
