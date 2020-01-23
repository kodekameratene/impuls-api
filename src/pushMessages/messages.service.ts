import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {Message} from './message.model';

@Injectable()
export class MessagesService {

    constructor(
        @InjectModel('Message') private readonly eventModel: Model<Message>,
    ) {
    }

    async insertMessage(
        title: string,
        description: string,
        location: string,
        startTime: Date,
        endTime: Date,
        image: string,
        arrangement: string,
    ) {
        const newMessage = new this.eventModel({
            title,
            description,
            location,
            startTime,
            endTime,
            image,
            arrangement,
        });
        const result = await newMessage.save();
        return result.id as string;
    }

    async deleteMessage(id: string) {
        const response = await this.eventModel.deleteOne({_id: id}).exec();
        if (response.deletedCount < 1) {
            throw new NotFoundException('Could not find Message');
        }
        return response;
    }

    async getMessages() {
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
                arrangement: event.arrangement,
            }));
    }

    async getMessagesWithArrangement(arrangement) {
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

    async getMessage(id: string) {
        const event = await this.findMessage(id);
        return ({
            id: event.id,
            title: event.title,
            description: event.description,
            location: event.location,
            startTime: event.startTime,
            endTime: event.endTime,
            image: event.image,
            arrangement: event.arrangement,
        });
    }

    async updateMessage(
        id: string,
        title: string,
        description: string,
        location: string,
        startTime: Date,
        endTime: Date,
        image: string,
        arrangement: string,
    ) {
        const updatedMessage = await this.findMessage(id);
        if (title) {
            updatedMessage.title = title;
        }
        if (description) {
            updatedMessage.description = description;
        }
        if (location) {
            updatedMessage.location = location;
        }
        if (startTime) {
            updatedMessage.startTime = startTime;
        }
        if (endTime) {
            updatedMessage.endTime = endTime;
        }
        if (image) {
            updatedMessage.image = image;
        }
        if (arrangement) {
            updatedMessage.arrangement = arrangement;
        }
        await updatedMessage.save();
        return null;
    }

    private async findMessage(id): Promise<Message> {
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
