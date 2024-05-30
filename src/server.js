import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import mongoose from 'mongoose';
import { env } from './utils/env.js';
import router from './routers/contacts.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

export function setupServer() {
  const app = express();
  const PORT = Number(env('PORT', '3000'));

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'HELLO WORLD',
    });
  });
  app.use(router);
  app.use(errorHandler);
  app.use(notFoundHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
