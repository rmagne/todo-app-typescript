import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import todo_routes from "./routes/todos";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

const db_uri = process.env.DB_URI;

mongoose
  .connect(
    "mongodb+srv://romif:vjFqO2j2dBho7LTT@cluster0.k1h7bvo.mongodb.net/todo_typescript?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/todos", todo_routes);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
