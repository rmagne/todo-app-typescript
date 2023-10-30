import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema: Schema = new Schema<IUser>({
  uid: { type: String, unique: true },
  username: String,
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
