import express from "express";
import controller from "../controllers/user";
import extractFirebaseInfo from "../middlewares/extractfirebaseinfo";

const router = express.Router();

router.get("/validate", extractFirebaseInfo, controller.validate);
router.post("/create", extractFirebaseInfo, controller.create);
router.post("/login", extractFirebaseInfo, controller.login);
router.get("/:UserID", controller.read);
router.get("/", controller.readAll);

export default router;
