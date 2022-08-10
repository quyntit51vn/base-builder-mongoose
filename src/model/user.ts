import mongoose from "mongoose";
import { IUser } from "./interface/IUser";
const userSchema = new mongoose.Schema<IUser>({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;