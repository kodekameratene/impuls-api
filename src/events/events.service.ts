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
        image: string,
        secret: boolean,
        arrangement: string,
    ) {
        const newEvent = new this.eventModel({
            title,
            description,
            location,
            startTime,
            endTime,
            image,
            secret,
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

    async getEvents(secrets: boolean) {
        const events = await this.eventModel.find().sort({startTime: 1}).exec();
        return events
            .map(event => ({
                id: event.id,
                title: event.title,
                description: event.description,
                location: event.location,
                startTime: event.startTime ? event.startTime : null,
                endTime: event.endTime ? event.endTime : null,
                image: event.image,
                secret: event.secret,
                arrangement: event.arrangement,
            })).filter(post => {
                return secrets ? true : !post.secret;
            });
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
                image: event.image,
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
            image: event.image,
            secret: event.secret,
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
        image: string,
        secret: boolean,
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
        if (image) {
            updatedEvent.image = image;
        }
        if (secret) {
            updatedEvent.secret = secret;
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
