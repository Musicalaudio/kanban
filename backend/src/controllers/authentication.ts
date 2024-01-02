import express from 'express';
import {
  getUserByEmail,
  createUser,
  getUserBySessionToken,
  getUserByUsername,
} from '../models/user.model.js';
import { authentication, random } from '../helpers/index.js';
import _ from 'lodash';

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
    domain: 'localhost',
    path: '/',
    sameSite: 'none',
    secure: true,
  });

  return res.status(200).json(user).end();
};

export const register = async (req: express.Request, res: express.Response) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    throw new Error('Please fill out all mandatory fields');
  }

  const existingUser = await getUserByEmail(email);
  const existingUsername = await getUserByUsername(username);

  if (existingUsername) {
    throw new Error(
      '{"usernameError": "That username is already taken, please enter another one."}'
    );
  }

  if (username.length < 5) {
    throw new Error(
      '{"usernameError": "Username must be atleast 5 characters long"}'
    );
  }

  if (existingUser) {
    throw new Error(
      '{"emailError": "That email is already in use, please enter another one."}'
    );
  }

  if (password.length < 5) {
    throw new Error(
      '{"passwordError": "Password must be atleast 5 characters long"}'
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
    throw new Error('Session is no longer valid.');
  }

  const existingUser = await getUserBySessionToken(sessionToken);

  if (!existingUser) {
    throw new Error(
      'User and/or password is incorrect, please enter a valid combination.'
    );
  }

  _.merge(req, { identity: existingUser });

  return res
    .status(200)
    .json({
      status: true,
      user: existingUser,
      message:
        '{"confirmation": "A confirmation email has been sent to that email address, assuming it\'s not already in use."}',
    })
    .end();
};

export const logout = async (req: express.Request, res: express.Response) => {
  const sessionToken = req.cookies['KANBAN-AUTH'];
  if (!sessionToken) {
    throw new Error('Session is no longer valid.');
  }
  console.log('THIS IS THE LGOUT CONTROLLER');
  const existingUser = await getUserBySessionToken(sessionToken);
  if (sessionToken) {
    res.cookie('KANBAN-AUTH', 'none', {
      domain: 'localhost',
      path: '/',
      sameSite: 'none',
      secure: true,
    });
  }
  return res
    .status(200)
    .json({
      status: true,
      user: existingUser,
      message: 'User logged out successfully',
    })
    .end();
};
