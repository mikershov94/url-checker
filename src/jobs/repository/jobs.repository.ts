import { Injectable } from '@nestjs/common';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobsRepository {
    private readonly store: Map<string, Job>;

    constructor() {
        this.store = new Map();
    }

    public create() {}
    public findById(id?: string): Job | undefined {
        if (!id) {
            return undefined;
        }

        return this.store.get(id);
    }
    public update() {}
    public delete() {}
}
