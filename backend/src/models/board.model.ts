// import mongoose from 'mongoose';

// export interface Subtasks {
//   title: String;
//   complete: boolean;
// }

// export interface Task {
//   title: String;
//   description: String;
//   subtask: Array<Subtasks> | [];
// }

// export interface Column {
//   title: string;
//   tasks: Array<Task> | [];
// }

// export interface Board {
//   title: String;
//   columns: Array<Column> | [];
// }

// export const boardSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     columns: {
//       type: Array<Column>,
//     },
//   },
//   { timestamps: true }
// );

// const Board = mongoose.model('Board', boardSchema);
// export default Board;
