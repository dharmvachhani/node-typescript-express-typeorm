import { Request, Response } from 'express';
import { Service } from 'typedi';
import { LogService } from './log.service';

@Service()
export class LogController {
    constructor(private readonly logService: LogService) { }

    async create(req: Request, res: Response): Promise<void> {
        const { level, message, meta, data } = req.body;
        const log = await this.logService.createLog(level, message, meta, data);
        res.status(201).json(log);
    }

    async findAll(_req: Request, res: Response): Promise<void> {
        const logs = await this.logService.getLogs();
        res.json(logs);
    }

    async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'ID is required' });
            return;
        }
        const log = await this.logService.getLogById(id);
        if (!log) {
            res.status(404).json({ message: 'Log not found' });
            return;
        }
        res.json(log);
    }

    async findByLevel(req: Request, res: Response): Promise<void> {
        const logs = await this.logService.getLogsByLevel(req.params.level as any);
        res.json(logs);
    }
}