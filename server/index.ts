import express, { Express, Request, Response, Application } from "express";
import * as firebaseAdmin from "firebase-admin";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todo_routes from "./routes/todos";
import user_routes from "./routes/user";
import extractFirebaseInfo from "./middlewares/extractfirebaseinfo";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

// Firebase configuration
const serviceAccountKey = require("./config/serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

//MongoDB configuration

const db_uri = process.env.DB_URI;

if (!db_uri) {
  throw new Error("DB_URI is not defined in .env file");
}

mongoose
  .connect(db_uri)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(extractFirebaseInfo);

//routes
app.use("/todos", todo_routes);
app.use("/users", user_routes);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
