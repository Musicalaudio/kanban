import express from 'express';
import exports from '../controllers/boards.ts';
import { isAuthenticated } from '../middlewares/index.ts';

const router = express.Router();

// GET all workouts
router.get('/', isAuthenticated, exports.getBoards);

//GET a single workout
router.get('/:id', isAuthenticated, exports.getBoard);

export default router;
