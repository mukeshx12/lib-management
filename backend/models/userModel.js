import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name"],
  },
  email: {
    type: String,
    required: [true, "Please fill the email"],
  },
  password: {
    type: String,
    required: [true, "Please fill the password"],
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user',
  },
});

const User = mongoose.model("User", userSchema);
export default User;
