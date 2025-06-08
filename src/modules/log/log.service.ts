// src/modules/log/log.service.ts
import { Service } from 'typedi';
import { Log } from './log.entity';
import { LogRepository } from './log.repository';

@Service()
export class LogService {
    constructor(private readonly logRepository: LogRepository) { }

    async createLog(
        level: Log['level'],
        message: string,
        meta?: Record<string, any>,
        data?: Record<string, any>
    ): Promise<Log> {
        const log = this.logRepository.create({ level, message, meta, data });
        return this.logRepository.save(log);
    }

    async getLogs(): Promise<Log[]> {
        return this.logRepository.find(); 
    }

    async getLogById(id: string): Promise<Log | null> {
        return this.logRepository.findOneBy({ id });
    }

    async getLogsByLevel(level: Log['level']): Promise<Log[]> {
        return this.logRepository.findByLevel(level); 
    }

    async getPaginatedLogs(page: number = 1, limit: number = 10): Promise<{ data: Log[]; total: number; page: number; lastPage: number }> {
        return this.logRepository.paginate(page, limit);
    }
}
