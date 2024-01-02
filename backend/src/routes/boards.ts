import express from 'express';
import {
  createBoard,
  editBoard,
  deleteBoard,
  createTask,
  saveTaskModal,
  deleteTask,
  editTask,
  moveTask,
} from '../controllers/boards.js';
import { isAuthenticated } from '../middlewares/index.js';
import { tryCatch } from '../helpers/tryCatch.js';

// create new board
export default (router: express.Router) => {
  router.post('/boards/create-board', isAuthenticated, tryCatch(createBoard));
  router.post('/boards/edit-board', isAuthenticated, tryCatch(editBoard));
  router.delete(
    '/boards/delete-board/:id',
    isAuthenticated,
    tryCatch(deleteBoard)
  );
  router.post('/boards/create-task', isAuthenticated, tryCatch(createTask));
  router.post(
    '/boards/save-task-modal',
    isAuthenticated,
    tryCatch(saveTaskModal)
  );
  router.delete('/boards/delete-task', isAuthenticated, tryCatch(deleteTask));
  router.put('/boards/edit-task/:id', isAuthenticated, tryCatch(editTask));
  router.put('/boards/move-task/:id', isAuthenticated, tryCatch(moveTask));
};
