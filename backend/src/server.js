import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import notesRouter from './router/notes.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', 3000));

dotenv.config();
export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  });
  app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello to Notelist!',
    });
  });
  app.use('/notes', notesRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
