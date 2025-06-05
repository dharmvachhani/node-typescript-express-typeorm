import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { initializeDatabase } from '@database/index';
import { errorHandler } from '@middlewares/errorHandler';
import rateLimiter from '@middlewares/rateLimiter';
import requestLogger from '@middlewares/requestLogger';
import { xssSanitizer } from '@middlewares/xssSanitizer';
import mainRouter from '@router/index';

initializeDatabase();

const app = express();

app.use(helmet());
app.use(cors());
app.use(xssSanitizer);
app.use(rateLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(requestLogger);
app.use('/', mainRouter);
app.use(errorHandler);

export default app;