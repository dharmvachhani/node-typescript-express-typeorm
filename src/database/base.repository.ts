// src/common/base.repository.ts
import { Repository, EntityTarget, DataSource, ObjectLiteral } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
    constructor(entity: EntityTarget<T>, dataSource: DataSource) {
        super(entity, dataSource.manager);
    }

    async paginate(page: number = 1, limit: number = 10): Promise<{ data: T[]; total: number; page: number; lastPage: number }> {
        const [data, total] = await this.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }
}
