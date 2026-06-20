import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateJobResponseDto } from './dto/create-job-response.dto';
import { CreateJobRequestDto } from './dto/create-job-request.dto';
import { JobsService } from './jobs.service';
import { GetJobsResponseDto } from './dto/get-jobs-response.dto';
import { GetUrlChecksInfoDto } from './dto/get-url-checks-info.dto';

@Controller('jobs')
export class JobsController {
    constructor(private readonly service: JobsService) {}

    @Post()
    createJob(@Body() dto: CreateJobRequestDto): CreateJobResponseDto {
        const jobId = this.service.createJob(dto.urls);

        return {
            jobId,
        };
    }

    @Get()
    getJobsList(): GetJobsResponseDto[] {
        return this.service.getJobsList();
    }

    @Get(':id')
    getUrlChecks(@Param('id') jobId: string): GetUrlChecksInfoDto[] {
        return this.service.getUrlChecks(jobId);
    }

    @Delete(':id')
    cancelJob() {}
}
