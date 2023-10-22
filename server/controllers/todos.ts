import ITodo from "../interfaces/todo";
import Todo from "../models/todo";
import { Request, Response } from "express";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoText = req.body.text;
    const todo: ITodo = new Todo({
      text: todoText,
    });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const checkTodo = async (req: Request, res: Response): Promise<void> => {
  const _id: string = req.params._id;
  try {
    const todo: ITodo | null = await Todo.findById(_id);
    if (todo) {
      todo.checked = !todo.checked;
      await todo.save();
      res.json(todo);
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const _id: string = req.params._id;
  try {
    const result: ITodo | null = await Todo.findByIdAndDelete(_id);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

const controller = {
  getTodos,
  addTodo,
  checkTodo,
  deleteTodo,
};
export default controller;
