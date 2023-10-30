import { Request, Response, NextFunction } from "express";
import firebaseAdmin from "firebase-admin";

async function extractFirebaseInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const fire_token = req.headers.authorization?.split("Bearer ")[1];

  try {
    if (fire_token) {
      const result = await firebaseAdmin.auth().verifyIdToken(fire_token);
      if (result) {
        res.locals.firebase = result;
        res.locals.fire_token = fire_token;
      }
    }
  } catch (err) {
    return res.status(401).json(err);
  }

  next();
}

export default extractFirebaseInfo;
