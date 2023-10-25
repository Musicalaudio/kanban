import express from 'express';

import {
  getUserByEmail,
  createUser,
  getUserBySessionToken,
} from '../models/user.model.ts';
import { authentication, random } from '../helpers/index.ts';
import _ from 'lodash';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send('Please make sure to input both: an email and a password');
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user) {
      return res
        .sendStatus(401)
        .send(
          'Invalid credentials, the email, password or both are incorrect.'
        );
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res
        .status(403)
        .send(
          'Invalid credentials, the email, password or both are incorrect.'
        );
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie('KANBAN-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    // const verifiedUser = await getUserByEmail(email)
    // console.log(verifiedUser);
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  console.log(req.body);
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).send('Please fill out all mandatory fields');
    }

    const existingUser = await getUserByEmail(email);
    const existingUsername = await getUserByEmail(username);

    if (existingUser) {
      return res
        .status(409)
        .send(
          "A confirmation email has been sent to that email address, assuming it's not already in use."
        );
    }

    if (existingUsername) {
      return res
        .status(409)
        .send('That username is already taken, please enter another one.');
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const loggedIn = async (req: express.Request, res: express.Response) => {
  console.log('YESSS 1');
  console.log(req.cookies);
  try {
    console.log('YESSS 2');
    const sessionToken = req.cookies['KANBAN-AUTH'];
    if (!sessionToken) {
      console.log('YESSS 3');
      return res.sendStatus(403);
    }
    console.log('YESSS 4');
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    _.merge(req, { identity: existingUser });

    return res.status(200).json(true).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
