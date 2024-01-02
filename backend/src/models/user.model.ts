import mongoose from 'mongoose';
import Board from './board.model.js';

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

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    authentication: {
      type: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
      },
      required: false,
    },
    boards: { type: [Board.schema] || [] },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);

// User Actions

//find user
export const getUsers = () => User.find();

//get user email
export const getUserByEmail = (email: string) => User.findOne({ email });

//get user email
export const getUserByUsername = (username: string) =>
  User.findOne({ username });

//get user by session token
export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({ 'authentication.sessionToken': sessionToken });

//get user by id
export const getUserById = (id: string) => User.findById(id);

//create new user
export const createUser = (values: Record<string, any>) =>
  new User(values)
    .save()
    .then((user: { toObject: () => any }) => user.toObject());

//delete user by id
export const deleteUserById = (id: string) =>
  User.findOneAndDelete({ _id: id });

//update user by id
export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate(id, values);
