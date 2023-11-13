import express from 'express';
import {
  getUserByEmail,
  createUser,
  getUserBySessionToken,
} from '../models/user.model.js';
import { authentication, random } from '../helpers/index.js';
import _ from 'lodash';

export const test = async (req: express.Request, res: express.Response) => {
  res.send('TEST');
};

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Please make sure to input both: an email and a password');
  }

  const user = await getUserByEmail(email).select(
    '+authentication.salt +authentication.password'
  );

  if (!user) {
    throw new Error(
      'Invalid credentials, the email, password or both are incorrect.'
    );
  }

  const expectedHash = authentication(user.authentication.salt, password);

  if (user.authentication.password != expectedHash) {
    throw new Error(
      'Invalid credentials, the email, password or both are incorrect.'
    );
  }

  const salt = random();
  user.authentication.sessionToken = authentication(salt, user._id.toString());

  await user.save();

  res.cookie('KANBAN-AUTH', user.authentication.sessionToken, {
    domain: '.kanban-musicalaudio.netlify.app',
    path: '/',
    sameSite: 'none',
    secure: true,
  });
  console.log(res.cookie);
  return res.status(200).json(user).end();
};

export const register = async (req: express.Request, res: express.Response) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    throw new Error('Please fill out all mandatory fields');
  }

  const existingUser = await getUserByEmail(email);
  const existingUsername = await getUserByEmail(username);

  if (existingUser) {
    throw new Error(
      "A confirmation email has been sent to that email address, assuming it's not already in use."
    );
  }

  if (existingUsername) {
    throw new Error(
      'That username is already taken, please enter another one.'
    );
  }

  const salt = random();
  const user = await createUser({
    email,
    username,
    authentication: {
      salt,
      password: authentication(salt, password),
    },
    boards: [],
  });

  return res.status(200).json(user).end();
};

export const loggedIn = async (req: express.Request, res: express.Response) => {
  const sessionToken = req.cookies['KANBAN-AUTH'];
  if (!sessionToken) {
    // return res.sendStatus(403);
    throw new Error('Session is no longer valid.');
  }

  const existingUser = await getUserBySessionToken(sessionToken);

  if (!existingUser) {
    // return res.sendStatus(403);
    throw new Error(
      'User and/or password is incorrect, please enter a valid combination.'
    );
  }

  _.merge(req, { identity: existingUser });

  return res.status(200).json({ status: true, user: existingUser }).end();
};
