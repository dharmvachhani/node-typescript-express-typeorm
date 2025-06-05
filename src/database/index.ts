import { handleError } from '@utils/error';
import logger from '@utils/logger';
import { AppDataSource } from './datasource';

export async function initializeDatabase(): Promise<void> {
  try {
    await AppDataSource.initialize();
    logger.info('DB_INITIALIZED');
  } catch (error) {
    handleError('DB_INITIALIZATION_ERROR', error)
  }
}