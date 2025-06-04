import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initializeDatabase } from '@database/index';
import mainRouter from '@router/index';
import rateLimiter from '@middlewares/rateLimiter';
import errorHandler from '@middlewares/errorHandler';
import { xssSanitizer } from '@middlewares/xssSanitizer';
import expressStatusMonitor from 'express-status-monitor';
import { EnvConfig } from '@config';

// Initialize database
initializeDatabase();

const app = express();
app.use(cors());
app.use(helmet());
app.use(xssSanitizer)
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressStatusMonitor({
    title: 'Server Health',
    healthChecks: [{ protocol: 'http', host: EnvConfig.app.host, port: EnvConfig.app.port, path: '/health' }],
  })
);

// Use main router
app.use('/', mainRouter);



// Error handling middleware
app.use(errorHandler())

export default app;