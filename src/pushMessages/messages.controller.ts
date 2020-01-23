import {MessagesService} from './messages.service';
import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import _ = require('lodash');

@Controller('events')
export class MessagesController {
    constructor(private readonly eventsService: MessagesService) {
    }

    @Post()
    async addMessage(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('location') location: string,
        @Body('startTime') startTime: Date,
        @Body('endTime') endTime: Date,
        @Body('image') image: string,
        @Body('arrangement') arrangement: string,
    ) {
        const generatedId = await this.eventsService.insertMessage(
            title,
            description,
            location,
            startTime,
            endTime,
            image,
            arrangement,
        );
        return {id: generatedId};
    }

    @Get()
    async getAllMessages(
        @Query('arrangement') arrangement: string,
        @Query('groupBy') groupBy: string,
    ) {
        let eventsToReturn;
        if (arrangement) {
            eventsToReturn = await this.eventsService.getMessagesWithArrangement(arrangement);
        } else {
            eventsToReturn = await this.eventsService.getMessages();
        }
        if (groupBy) {
            eventsToReturn = _.groupBy(eventsToReturn, groupBy);
        }
        return eventsToReturn;
    }

    @Get(':id')
    getMessage(@Param('id') id: string) {
        return this.eventsService.getMessage(id);
    }

    @Patch(':id')
    async updateMessage(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('location') location: string,
        @Body('startTime') startTime: Date,
        @Body('endTime') endTime: Date,
        @Body('image') image: string,
        @Body('arrangement') arrangement: string,
    ) {
        return await this.eventsService.updateMessage(id, title, description, location, startTime, endTime, image, arrangement);
    }

    @Delete(':id')
    async removeMessage(@Param('id') id: string) {
        return await this.eventsService.deleteMessage(id);
    }
}
