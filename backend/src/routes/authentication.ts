import express from 'express';

import { login, register, loggedIn } from '../controllers/authentication.ts';
import { tryCatch } from '../helpers/tryCatch.ts';

export default (router: express.Router) => {
  router.post('/auth/register', tryCatch(register));
  router.post('/auth/login', tryCatch(login));
  router.post('/auth/loggedIn', tryCatch(loggedIn));
};
