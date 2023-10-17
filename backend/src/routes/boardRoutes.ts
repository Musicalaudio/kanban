import express from 'express';
import exports from '../controllers/boards.ts';

const router = express.Router();

// GET all workouts
router.get('/', exports.getBoards);

//GET a single workout
router.get('/:id', exports.getBoard);

export default router;
