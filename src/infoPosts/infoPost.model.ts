import * as mongoose from 'mongoose';

export const InfoPostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    location: String,
    index: Number,
    published: Boolean,
    image: String,
    secret: Boolean,
    arrangement: [{type: mongoose.Schema.Types.ObjectId, ref: 'Arrangement'}],
});

export interface InfoPost extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    location: string;
    index: number;
    published: boolean;
    image: string;
    secret: boolean;
    arrangement: string;
}
