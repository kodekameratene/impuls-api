import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {Event} from './event.model';

@Injectable()
export class EventsService {

    constructor(
        @InjectModel('Event') private readonly eventModel: Model<Event>,
    ) {
    }

    async insertEvent(
        title: string,
        description: string,
        location: string,
        startTime: Date,
        endTime: Date,
        imgUrl: string,
        arrangement: string,
    ) {
        const newEvent = new this.eventModel({
            title,
            description,
            location,
            startTime,
            endTime,
            imgUrl,
            arrangement,
        });
        const result = await newEvent.save();
        return result.id as string;
    }

    async deleteEvent(id: string) {
        const response = await this.eventModel.deleteOne({_id: id}).exec();
        if (response.deletedCount < 1) {
            throw new NotFoundException('Could not find Event');
        }
        return response;
    }

    async getEvents() {
        const events = await this.eventModel.find().sort({startTime: 1}).exec();
        return events
            .map(event => ({
                id: event.id,
                title: event.title,
                description: event.description,
                location: event.location,
                startTime: event.startTime ? event.startTime : null,
                endTime: event.endTime ? event.endTime : null,
                imgUrl: event.imgUrl,
                arrangement: event.arrangement,
            }));
    }

    async getEventsWithArrangement(arrangement) {
        const events = await this.eventModel.find({arrangement}).sort({startTime: 1}).exec();
        return events
            .map(event => ({
                id: event.id,
                title: event.title,
                description: event.description,
                location: event.location,
                startTime: event.startTime ? event.startTime : null,
                endTime: event.endTime ? event.endTime : null,
                imgUrl: event.imgUrl,
                arrangement: event.arrangement,
            }));
    }

    async getEvent(id: string) {
        const event = await this.findEvent(id);
        return ({
            id: event.id,
            title: event.title,
            description: event.description,
            location: event.location,
            startTime: event.startTime,
            endTime: event.endTime,
            imgUrl: event.imgUrl,
            arrangement: event.arrangement,
        });
    }

    async updateEvent(
        id: string,
        title: string,
        description: string,
        location: string,
        startTime: Date,
        endTime: Date,
        imgUrl: string,
        arrangement: string,
    ) {
        const updatedEvent = await this.findEvent(id);
        if (title) {
            updatedEvent.title = title;
        }
        if (description) {
            updatedEvent.description = description;
        }
        if (location) {
            updatedEvent.location = location;
        }
        if (startTime) {
            updatedEvent.startTime = startTime;
        }
        if (endTime) {
            updatedEvent.endTime = endTime;
        }
        if (imgUrl) {
            updatedEvent.imgUrl = imgUrl;
        }
        if (arrangement) {
            updatedEvent.arrangement = arrangement;
        }
        await updatedEvent.save();
        return null;
    }

    private async findEvent(id): Promise<Event> {
        let event;
        try {
            event = await this.eventModel.findById(id).exec();
        } catch (e) {
            throw new NotFoundException('Could not find event.');
        }
        if (!event) {
            throw new NotFoundException('Could not find event.');
        }
        return event;
    }
}
