import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    columns: {
      type: Array<Object>,
    },
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', boardSchema);
export default Board;
