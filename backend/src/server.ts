import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
// import serverless from 'serverless-http';

dotenv.config();

//the link we send the http requests to for the db conneciton
const mongoURI: string = process.env.URI as string;

//the port that we want to connect to on our PC
const port = process.env.PORT || 8050;

// create express app
const app = express();
app.set('trust proxy', 1);

const appRouter = express.Router();
//middleware

app.use('/', express.static('dist'));

app.use(
  cors({
    origin: process.env.ORIGIN as string,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// just gives us info
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

app.use('/api', router());
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

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

export default app;
