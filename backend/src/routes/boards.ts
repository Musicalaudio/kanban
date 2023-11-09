import express from 'express';
import { createBoard } from '../controllers/boards.js';
import { isAuthenticated } from '../middlewares/index.js';
import { tryCatch } from '../helpers/tryCatch.js';

// GET all board
// router.get('/boards/all-boards', isAuthenticated, getBoards);

//GET a single board
// router.get('boards/:id', isAuthenticated, getBoard);

// create new board
export default (router: express.Router) => {
  router.post('/boards/create-board', isAuthenticated, tryCatch(createBoard));
};
