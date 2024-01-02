import mongoose from 'mongoose';
import Task from './task.model.js';

export const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    clientID: { type: String },
    tasks: {
      type: [Task.schema] || [],
    },
  },
  { timestamps: true }
);

const Column = mongoose.model('Column', columnSchema);
export default Column;
