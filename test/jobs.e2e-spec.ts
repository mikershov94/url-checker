import request from 'supertest';
import type { Server } from 'node:http';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JobsModule } from '../src/jobs/jobs.module';
import { CreateJobResponseDto } from '../src/jobs/dto/create-job-response.dto';
import { GetJobsResponseDto } from '../src/jobs/dto/get-jobs-response.dto';
import { GetUrlChecksInfoDto } from '../src/jobs/dto/get-url-checks-info.dto';
import { JobStatus } from '../src/jobs/consts/job-status.const';

describe('JobsController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [JobsModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/jobs (POST) создает job и возвращает jobId', async () => {
        const server = app.getHttpServer() as Server;
        const response = await request(server)
            .post('/jobs')
            .send({
                urls: ['https://example.com'],
            })
            .expect(201);

        const body = response.body as CreateJobResponseDto;

        expect(typeof body.jobId).toBe('string');
        expect(body.jobId).not.toHaveLength(0);
    });

    it('/jobs (POST) создает job и возвращает jobId', async () => {
        const server = app.getHttpServer() as Server;
        const response = await request(server)
            .post('/jobs')
            .send({
                urls: ['https://example.com'],
            })
            .expect(201);

        const body = response.body as CreateJobResponseDto;

        expect(typeof body.jobId).toBe('string');
        expect(body.jobId).not.toHaveLength(0);
    });

    it('/jobs (GET) возвращает список созданных Jobs со статистикой', async () => {
        const server = app.getHttpServer() as Server;

        const response_1 = await request(server)
            .post('/jobs')
            .send({
                urls: ['https://job1.com'],
            })
            .expect(201);

        const response_2 = await request(server)
            .post('/jobs')
            .send({
                urls: ['https://job2.com', 'https://job3.com'],
            })
            .expect(201);

        const postBody_1 = response_1.body as CreateJobResponseDto;
        const postBody_2 = response_2.body as CreateJobResponseDto;

        const getResponse = await request(server).get('/jobs').expect(200);
        const body = getResponse.body as GetJobsResponseDto[];

        expect(body).toHaveLength(2);

        expect(body[0]).toEqual({
            id: postBody_1.jobId,
            status: JobStatus.pending,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            urlCount: 1,
            successCount: 0,
            errorCount: 0,
        });

        expect(body[1]).toEqual({
            id: postBody_2.jobId,
            status: JobStatus.pending,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            urlCount: 2,
            successCount: 0,
            errorCount: 0,
        });
    });

    it('/jobs/:id (GET) возврашает информацию по каждому URL в Job', async () => {
        const urls = ['https://example.com'];

        const server = app.getHttpServer() as Server;
        const postResponse = await request(server).post('/jobs').send({
            urls,
        });
        const postBody = postResponse.body as CreateJobResponseDto;

        const getResponse = await request(server).get(`/jobs/${postBody.jobId}`);
        const getBody = getResponse.body as GetUrlChecksInfoDto[];
        const returnedUrls = getBody.map((info) => info.url);
        expect(returnedUrls).toEqual(urls);
    });

    afterEach(async () => {
        await app.close();
    });
});
