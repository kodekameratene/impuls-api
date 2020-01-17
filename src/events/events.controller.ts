import {EventsService} from './events.service';
import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {
    }

    @Post()
    async addEvent(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('location') location: string,
        @Body('startTime') startTime: Date,
        @Body('endTime') endTime: Date,
        @Body('imgUrl') imgUrl: string,
        @Body(':arrangement') arrangement: string,
    ) {
        const generatedId = await this.eventsService.insertEvent(
            title,
            description,
            location,
            startTime,
            endTime,
            imgUrl,
            arrangement,
        );
        return {id: generatedId};
    }

    @Get()
    async getAllEvents(
        @Query('arrangement') arrangement: string,
    ) {
        if (arrangement) {
            return await this.eventsService.getEventsWithArrangement(arrangement);
        }
        return await this.eventsService.getEvents();
    }

    @Get(':id')
    getEvent(@Param('id') id: string) {
        return this.eventsService.getEvent(id);
    }

    @Patch(':id')
    async updateEvent(
        @Param('id')id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('location') location: string,
        @Body('startTime') startTime: Date,
        @Body('endTime') endTime: Date,
        @Body('imgUrl') imgUrl: string,
        @Body('arrangement') arrangement: string,
    ) {
        return await this.eventsService.updateEvent(id, title, description, location, startTime, endTime, imgUrl, arrangement);
    }

    @Delete(':id')
    async removeEvent(@Param('id') id: string) {
        return await this.eventsService.deleteEvent(id);
    }
}
