import express from "express";
import cors from "cors";
import { ConnectDB } from "./config/db.js";
import workoutRouter from "./routes/workoutRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://workout-project-frontend.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

ConnectDB();

app.get("/", (req, res) => {
  res.send("Hello, worlds!"); // Sending a plain text response
});

// Set CORS headers for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://workout-project-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/workout", workoutRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
