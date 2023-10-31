import { Request, Response, NextFunction } from "express";
import firebaseAdmin from "firebase-admin";

async function extractFirebaseInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const fire_token = req.headers.authorization?.split("Bearer ")[1];

  if (!fire_token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(fire_token);
    res.locals.firebase = decodedToken;
    res.locals.fire_token = fire_token;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Token verification failed." });
  }
}

export default extractFirebaseInfo;
