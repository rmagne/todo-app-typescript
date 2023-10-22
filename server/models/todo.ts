import mongoose, { Schema } from "mongoose";
import ITodo from "../interfaces/todo";

const TodoSchema = new Schema<ITodo>({
  text: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model<ITodo>("Todos", TodoSchema);

export default Todo;
