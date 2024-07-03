import express from "express";
import cors from "cors";
import { ConnectDB } from "./config/db.js";
import workoutRouter from "./routes/workoutRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 4000;

  
app.use(cors());
app.use(express.json());

ConnectDB();

app.get("/", (req, res) => {
  res.send("Hello, worlds!"); // Sending a plain text response
});

app.use("/api/workout", workoutRouter);
app.use("/images", express.static("uploads"));

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
