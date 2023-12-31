import mongoose, { Schema } from "mongoose";
import ITodo from "../interfaces/todo";

const TodoSchema: Schema = new Schema<ITodo>({
  text: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Todo = mongoose.model<ITodo>("Todos", TodoSchema);

export default Todo;
