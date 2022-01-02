import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
  },
  email: {
    type: String,
    unique : true,
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    min: [8, "Password must be 8 character"],
    required: [true, "Username is required"],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  last_login: {
    type: Date,
    default: new Date(),
  },
  token: String,
  isAdmin: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("User", userSchema);
