import winston from 'winston';
import Transport from 'winston-transport';
import { EnvConfig } from '@config';
import { Context } from '@utils/context';
import { isEmptyObject } from '@utils/helpers';
// import LogService from './logService';


class DBTransport extends Transport {
  override log(info: any, callback: () => void): void {
    setImmediate(() => this.emit('logged', info));
    try {
      const { level, message, timestamp, data, metadata } = info;
      // await LogService.insert(info);
      console.log('Log info to be inserted into DB:', { level, message, timestamp, data, metadata });
    } catch (err) {
      console.error('Failed to insert log into DB:', err);
    }
    callback();
  }
}

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, data, metadata }) => {
    const dataStr = !isEmptyObject(data) ? `\ndata: ${JSON.stringify(data, null, 2)}` : '';
    const metaStr = !isEmptyObject(metadata) ? `\nmetadata: ${JSON.stringify(metadata, null, 2)}` : '';
    return `[${timestamp}] ${level}: ${message}${dataStr}${metaStr}`;
  })
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: consoleFormat,
  }),
];

if (EnvConfig.isProd) {
  transports.push(new DBTransport());
}


const baseLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports,
});

interface LogPayload {
  name?: string;
  data?: any;
}

type LogLevel = 'info' | 'error' | 'warn' | 'debug';
type FlexiblePayload = LogPayload | string;

const log = (level: LogLevel, input: FlexiblePayload): void => {
  let payload: LogPayload;

  if (typeof input === 'string') {
    payload = { name: input };
  } else {
    payload = input;
  }

  const ctx = Context.get() || {};
  baseLogger.log({
    level,
    message: payload.name || '',
    timestamp: new Date().toISOString(),
    data: payload.data || {},
    metadata: ctx,
  });
};

const logger = {
  info: (payload: FlexiblePayload): void => log('info', payload),
  error: (payload: FlexiblePayload): void => log('error', payload),
  warn: (payload: FlexiblePayload): void => log('warn', payload),
  debug: (payload: FlexiblePayload): void => log('debug', payload)
};

export default logger;