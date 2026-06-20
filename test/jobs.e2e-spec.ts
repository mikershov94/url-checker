import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JobsModule } from '../src/jobs/jobs.module';
import { CreateJobResponseDto } from '../src/jobs/dto/create-job-response.dto';
import type { Server } from 'node:http';
import { GetJobsResponseDto } from 'src/jobs/dto/get-jobs-response.dto';
import { GetUrlChecksInfoDto } from 'src/jobs/dto/get-url-checks-info.dto';

describe('JobsController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
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

    it('/jobs (GET) возвращает список созданных Jobs', async () => {
        const server = app.getHttpServer() as Server;
        const response_1 = await request(server)
            .post('/jobs')
            .send({
                urls: ['https://job1.com'],
            });

        const response_2 = await request(server)
            .post('/jobs')
            .send({
                urls: ['https://job2.com'],
            });

        const postBody_1 = response_1.body as CreateJobResponseDto;
        const postBody_2 = response_2.body as CreateJobResponseDto;

        const getResponse = await request(server).get('/jobs').expect(200);
        const body = getResponse.body as GetJobsResponseDto[];

        expect(body[0].id).toBe(postBody_1.jobId);
        expect(body[1].id).toBe(postBody_2.jobId);
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
