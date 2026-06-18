import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('jobs')
export class JobsController {
    @Post()
    createJob() {}

    @Get()
    getJobsList() {}

    @Get(':id')
    getJobDetails() {}

    @Delete(':id')
    cancelJob() {}
}
