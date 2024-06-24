import express from 'express';
import "dotenv/config"
import cors from 'cors';
import { ConnectDB } from './config/db.js';
import workoutRouter from './routes/workoutRoute.js';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

ConnectDB();

app.get("/", (req, res) => {
  res.send("<h2 className='text-orange-500'> Api working!  </h2>")
})

app.use("/api/workout",workoutRouter)

app.listen(port, () => {
  console.log(` Server Started on http://localhost:${port}`)
})
