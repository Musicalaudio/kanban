import express from 'express';
import app from '../src/server.ts';
import cookieParser from 'cookie-parser';
import cors from 'cors';
app.use(cors({ origin: [process.env.ORIGIN as string], credentials: true }));
app.use(cookieParser());
app.use(express.json());
export default app;
