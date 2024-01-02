import mongoose from 'mongoose';

export const subtaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    clientID: { type: String },
    complete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Subtask = mongoose.model('Subtasks', subtaskSchema);
export default Subtask;
