import express from 'express';
import cors from 'cors';
import { ConnectDB } from './config/db.js';
import workoutRouter from './routes/workoutRoute.js';
import userRouter from './routes/userRoute.js';
import "dotenv/config"

const app = express();
const port = 4000;

app.use(cors( 
    {
      origin:["https://deploy-mern-1whq.vercel.app"],
      methods:["POST","GET"],
      credentials:true,
    }
));
// app.use(cors())
app.use(express.json());

ConnectDB();

app.get("/", (req, res) => {
  res.send("<h2 className='text-orange-500'> Api working!  </h2>")
})

app.use("/api/workout",workoutRouter)
app.use("/api/user",userRouter);

app.listen(port, () => {
  console.log(` Server Started on http://localhost:${port}`)
})
