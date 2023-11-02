// import Board from '../models/board.model.ts';
import mongoose from 'mongoose';
import express from 'express';
import { Board, Column } from '../models/user.model.ts';
import { getUserBySessionToken } from '../models/user.model.ts';

export const createBoard = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { board, column } = req.body;
  let existingUser = await getUserBySessionToken(req.cookies['KANBAN-AUTH']);

  if (!board.name) {
    throw new Error('You must include a title for your board to be created.');
  }

  existingUser.boards.forEach((existingBoard: Board) => {
    if (existingBoard.title === board.name) {
      throw new Error('User cannot have multiple boards with the same name');
    }
  });

  let columns: Array<Column> = [];
  //if we created columns, check if column names are diplicated
  if (column) {
    if (new Set(column).size !== column.length) {
      throw new Error('Cannot have multiple columns with the same name');
    }

    column.forEach((title: string) =>
      columns.push({ title: title, tasks: [] })
    );
  }
  const result = { title: board.name, columns: columns };

  existingUser.boards.push(result);
  await existingUser.save();
  res.status(200).send(existingUser);
};

export const deleteBoard = () => {};

export const createTask = () => {};

export const deleteTask = () => {};

export const orderTask = () => {};

export const completeSubtask = () => {};

// export const
