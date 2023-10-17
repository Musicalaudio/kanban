import Board from '../models/board.model.ts';
import mongoose from 'mongoose';
import express from 'express';
// get all workouts
const getBoards = async (req: express.Request, res: express.Response) => {
  const workouts = await Board.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get a single board
const getBoard = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const board = await Board.findById(id);

  if (!board) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(board);
};

const exports = {
  getBoards,
  getBoard,
};

export default exports;
