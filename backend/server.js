import express from "express";
import cors from "cors";
import { ConnectDB } from "./config/db.js";
import workoutRouter from "./routes/workoutRoute.js";
import userRouter from "./routes/userRoute.js";
import testingRoute from "./routes/testingRoute.js";
import adminRouter from './routes/adminRoute.js'
import "dotenv/config";
import announcementRouter from "./routes/announcementRoute.js";

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
app.use("/api/admin", adminRouter);
app.use("/api/admin/announcement", announcementRouter);

// app.use("/api/user", testingRoute);

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
