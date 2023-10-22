import express from "express";
const router = express.Router();

import controller from "../controllers/todos";

router.get("/", controller.getTodos);
router.post("/new", controller.addTodo);
router.put("/check/:_id", controller.checkTodo);
router.delete("/delete/:_id", controller.deleteTodo);

export default router;
