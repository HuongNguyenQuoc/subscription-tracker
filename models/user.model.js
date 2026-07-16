import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Username is required'],
    trim: true, 
    minLength: [3, 'Username must be at least 3 characters long'],
    maxLength: [30, 'Username cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a vaid email address'],
  },
  password: {
    type: String,
    required: [true, 'User Password is required'],
    minLength: 6,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;