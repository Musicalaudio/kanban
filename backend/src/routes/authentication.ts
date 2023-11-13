import express from 'express';

import {
  login,
  register,
  loggedIn,
  test,
} from '../controllers/authentication.js';
import { tryCatch } from '../helpers/tryCatch.js';

export default (router: express.Router) => {
  router.get('/auth/test', tryCatch(test));
  router.post('/auth/register', tryCatch(register));
  router.post('/auth/login', tryCatch(login));
  router.post('/auth/loggedIn', tryCatch(loggedIn));
};
