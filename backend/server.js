import express from "express";
import cors from "cors";
import { ConnectDB } from "./config/db.js";
import workoutRouter from "./routes/workoutRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

// Allow multiple origins
const allowedOrigins = [
  'https://workout-project-frontend.vercel.app',
  'https://workout-project-frontend-black.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

ConnectDB();

app.get("/", (req, res) => {
  res.send("Hello, worlds!"); // Sending a plain text response
});

app.use("/api/workout", workoutRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
