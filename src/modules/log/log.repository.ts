// src/modules/log/log.repository.ts
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@database/base.repository';
import { Log } from './log.entity';

@Service()
export class LogRepository extends BaseRepository<Log> {
    constructor(private readonly dataSource: DataSource) {
        super(Log, dataSource);
    }

    findByLevel(level: Log['level']): Promise<Log[]> {
        return this.find({ where: { level } });
    }
}
