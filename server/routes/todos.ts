import express from "express";
const router = express.Router();

import controller from "../controllers/todos";
import extractFirebaseInfo from "../middlewares/extractfirebaseinfo";

router.get("/:userid", extractFirebaseInfo, controller.getTodos);
router.post("/new", extractFirebaseInfo, controller.addTodo);
router.put("/check/:_id", extractFirebaseInfo, controller.checkTodo);
router.delete("/delete/:_id", extractFirebaseInfo, controller.deleteTodo);

export default router;
