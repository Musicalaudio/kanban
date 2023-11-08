import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import router from './routes/index.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

dotenv.config();

//the link we send the http requests to for the db conneciton
const mongoURI: string = process.env.URI as string;

//the port that we want to connect to on our PC
const port = process.env.PORT || 8000;

// create express app
const app = express();

//middleware
// app.use(cors({ origin: [process.env.ORIGIN as string], credentials: true }));
// app.use(cookieParser());
// app.use(express.json());

// just gives us info
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/', router());

// error handling middleware only works if declared after routes
app.use(errorHandler);
// connect to mongodb with mongoose
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected!');
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

export default app;
