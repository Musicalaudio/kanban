import mongoose from 'mongoose';
import Subtask from './subtask.model.js';

export const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    subtasks: {
      type: [Subtask.schema] || [],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
