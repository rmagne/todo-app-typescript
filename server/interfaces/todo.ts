import { Document } from "mongoose";
import IUser from "./user";

export default interface ITodo extends Document {
  text: string;
  checked: boolean;
  _id: string;
  user: IUser;
}
