import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';
import { initializeDatabase } from './database/index';
import mainRouter from './router';

// Initialize database
initializeDatabase();

// Initialize Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // TODO: Add database transport for logging errors
  ],
});

const app = express();

// Use security middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Use main router
app.use('/', mainRouter);

// Basic error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.message, { stack: err.stack, path: req.path });
  res.status(500).send('Something went wrong!');
});

export default app;