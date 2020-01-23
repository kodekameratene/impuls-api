import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    location: String,
    startTime: Date,
    endTime: Date,
    image: String,
    arrangement: [{type: mongoose.Schema.Types.ObjectId, ref: 'Arrangement'}],
    
});

export interface Event extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    location: string;
    startTime: Date;
    endTime: Date;
    image: string;
    arrangement: string;
}
