import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model('User', userSchema);

// User Actions

//find user
export const getUsers = () => UserModel.find();

//get user email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

//get user by session token
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });

//get user by id
export const getUserById = (id: string) => UserModel.findById(id);

//create new user
export const createUser = (values: Record<string, any>) =>
  new UserModel(values)
    .save()
    .then((user: { toObject: () => any }) => user.toObject());

//delete user by id
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

//update user by id
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
