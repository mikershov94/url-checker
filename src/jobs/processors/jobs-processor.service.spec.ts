import { Test, TestingModule } from '@nestjs/testing';
import { JobsProcessor } from './jobs-processor.service';
import { JobsRepository } from '../repository/jobs.repository';
import { JobStatus } from '../consts/job-status.const';
import { JobId } from '../entities/job.entity';
import { UrlCheckStatus } from '../consts/url-check-status.const';
import { UrlCheckerService } from '../services/url-checker.service';

describe('JobsProcessor', () => {
    let processor: JobsProcessor;
    let repository: jest.Mocked<Omit<JobsRepository, 'store'>>;
    let urlChecker: jest.Mocked<UrlCheckerService>;

    beforeAll(async () => {
        repository = {
            create: jest.fn(),
            getList: jest.fn(),
            findById: jest.fn(),
            getUrlChecksByJobId: jest.fn(),
            setStatus: jest.fn(),
        };

        urlChecker = {
            check: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JobsProcessor,
                {
                    provide: JobsRepository,
                    useValue: repository,
                },
                {
                    provide: UrlCheckerService,
                    useValue: urlChecker,
                },
            ],
        }).compile();

        processor = module.get<JobsProcessor>(JobsProcessor);
    });

    it('должен быть определен', () => {
        expect(processor).toBeDefined();
    });

    it('process должен переводить Job в inProgress перед выполнением запросов', async () => {
        const jobId = 'job-1';

        repository.findById.mockReturnValue({
            id: jobId,
            status: JobStatus.pending,
            createdAt: new Date(),
            updatedAt: new Date(),
            urlChecks: [],
        });

        await processor.process(jobId);

        expect(repository.setStatus).toHaveBeenCalledWith(jobId, JobStatus.inProgress);
    });

    it('process должен выполнять HEAD-запрос для каждого URL', async () => {
        const jobId: JobId = 'job-1';

        repository.findById.mockReturnValue({
            id: jobId,
            status: JobStatus.pending,
            createdAt: new Date(),
            updatedAt: new Date(),
            urlChecks: [
                {
                    url: 'https://example1.com',
                    status: UrlCheckStatus.pending,
                },
                {
                    url: 'https://example2.com',
                    status: UrlCheckStatus.pending,
                },
            ],
        });

        urlChecker.check.mockResolvedValue(200);

        await processor.process(jobId);

        expect(urlChecker.check).toHaveBeenCalledTimes(2);
        expect(urlChecker.check).toHaveBeenNthCalledWith(1, 'https://example1.com');
        expect(urlChecker.check).toHaveBeenNthCalledWith(2, 'https://example2.com');
    });

    it('process должен завершать Job', async () => {
        const jobId = 'job-1';

        repository.findById.mockReturnValue({
            id: jobId,
            status: JobStatus.pending,
            createdAt: new Date(),
            updatedAt: new Date(),
            urlChecks: [],
        });

        await processor.process(jobId);

        expect(repository.setStatus).toHaveBeenCalledWith(jobId, JobStatus.completed);
    });
});
