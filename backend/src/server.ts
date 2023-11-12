import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

//the link we send the http requests to for the db conneciton
const mongoURI: string = process.env.URI as string;

//the port that we want to connect to on our PC
const port = process.env.PORT || 8050;

// create express app
const app = express();
app.set('trust proxy', 1);
//middleware
// if(proc)

// const corsTest = app.use((req, res, next) => {
//   //set header first to allow request or origin domain (value can be different)
//   console.log('HELLO MAAAAAAAAAAAAAAN');
//   res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN as string);
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, PATCH, OPTIONS, DELETE'
//   );

//   //---- other code
//   console.log(req.method);
//   //Preflight CORS handler
//   if (req.method === 'OPTIONS') {
//     console.log('YUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUH');
//     return res.status(200).json({
//       body: 'OK',
//     });
//   }
//   next();
// });

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

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

export default app;
