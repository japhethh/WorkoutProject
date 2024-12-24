import express from "express";
import cors from "cors";
import { ConnectDB } from "./config/db.js";
import workoutRouter from "./routes/workoutRoute.js";
import userRouter from "./routes/userRoute.js";
import testingRoute from "./routes/testingRoute.js";
import adminRouter from "./routes/adminRoute.js";
import "dotenv/config";
import announcementRouter from "./routes/announcementRoute.js";
import exerciseRouter from "./routes/exerciseRouter.js";
import exerciseBundleRouter from "./routes/exerciseBundleRoutes.js";
import { totalPrices } from "./models/totalPriceAggregation.js";

const app = express();
const port = process.env.PORT || 3000;

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
app.use("/api/user/exercise/", exerciseRouter);
app.use("/api/user/bundle/", exerciseBundleRouter);
app.use("/api/user/totalAmount", totalPrices);
app.post("/adduser", async (req, res) => {
  const { name, email, password } = req.body;
  const URL = "http://localhost:4000/api/user/register";
  const response = await axios.post(URL, { name, email, password });

  res.status(200).json(response);
});

// app.use("/api/user", testingRoute);

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
