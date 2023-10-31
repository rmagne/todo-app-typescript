import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema: Schema = new Schema({
  uid: { type: String, unique: true },
  name: { type: String },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
