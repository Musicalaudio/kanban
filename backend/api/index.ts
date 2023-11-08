import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { errorHandler } from '../src/middlewares/errorHandler.ts';
import router from '../src/routes/index.ts';
const app = express();
const port = process.env.PORT || 8000;
//middleware
app.use(cors({ origin: [process.env.ORIGIN as string], credentials: true }));
app.use(cookieParser());
app.use(express.json());

// just gives us info
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/', router());

// error handling middleware only works if declared after routes
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

export default app;
