import mongoose from 'mongoose';

export const authSchema = new mongoose.Schema({
  password: { type: String, required: true, select: false },
  salt: { type: String, select: false },
  sessionToken: { type: String, select: false },
});

const Auth = mongoose.model('Auth', authSchema);
export default Auth;
