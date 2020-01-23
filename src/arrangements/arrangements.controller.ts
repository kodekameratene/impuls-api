import {ArrangementsService} from './arrangements.service';
import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';

@Controller('arrangements')
export class ArrangementsController {
    constructor(private readonly arrangementsService: ArrangementsService) {
    }

    @Post()
    async addArrangement(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('location') location: string,
        @Body('startTime') startTime: Date,
        @Body('endTime') endTime: Date,
        @Body('image') image: string,
    ) {
        const generatedId = await this.arrangementsService.insertArrangement(
            title,
            description,
            location,
            startTime,
            endTime,
            image,
        );
        return {id: generatedId};
    }

    @Get()
    async getAllArrangements() {
        return await this.arrangementsService.getArrangements();
    }

    @Get(':id')
    getArrangement(@Param('id') id: string) {
        return this.arrangementsService.getArrangement(id);
    }

    @Patch(':id')
    async updateArrangement(
        @Param('id')id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('location') location: string,
        @Body('startTime') startTime: Date,
        @Body('endTime') endTime: Date,
        @Body('image') image: string,
    ) {
        return await this.arrangementsService.updateArrangement(id, title, description, location, startTime, endTime, image);
    }

    @Delete(':id')
    async removeArrangement(@Param('id') id: string) {
        return await this.arrangementsService.deleteArrangement(id);
    }
}
