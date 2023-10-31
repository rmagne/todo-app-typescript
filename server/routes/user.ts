import express from "express";
import controller from "../controllers/user";
import extractFirebaseInfo from "../middlewares/extractfirebaseinfo";

const router = express.Router();

router.get("/validate", extractFirebaseInfo, controller.validate);
router.post("/create", extractFirebaseInfo, controller.create);
router.post("/login", extractFirebaseInfo, controller.login);
router.get("/verify", extractFirebaseInfo, (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    decodedtoken: res.locals.firebase,
    fire_token: res.locals.fire_token,
  });
});

router.get("/:_id", controller.read);
router.get("/", controller.readAll);

export default router;
