import { Server } from 'http';
import { EnvConfig } from '@config';
import logger from '@utils/logger';
import app from '@src/app';

let server: Server;

const startServer = (): void => {
  try {
    server = app.listen(EnvConfig.app.port, () => {
      logger.info('SERVER_STARTED');
    });
  } catch (error) {
    logger.error({ name: 'SERVER_START_FAILED', data: { error } });
    process.exit(1);
  }
};

const shutdown = (signal: string): void => {
  logger.error({ name: 'SHUTDOWN_SIGNAL_RECEIVED', data: { signal } });

  server.close(() => {
    logger.info('SERVER_CLOSED');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('FORCEFUL_SHUTDOWN_TIMEOUT');
    process.exit(1);
  }, 10000);
};

process.on('uncaughtException', (error) => {
  logger.error({ name: 'UNCAUGHT_EXCEPTION', data: { error } });
  shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  logger.error({ name: 'UNHANDLED_REJECTION', data: { reason } });
  shutdown('unhandledRejection');
});

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

if (process.listenerCount('exit') === 0) {
  process.on('exit', (code) => {
    logger.error({ name: 'PROCESS_EXIT', data: { code } });
  });
}

startServer();