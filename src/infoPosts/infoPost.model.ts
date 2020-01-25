import * as mongoose from 'mongoose';

export const InfoPostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    location: String,
    index: Number,
    draft: Boolean,
    image: String,
    arrangement: [{type: mongoose.Schema.Types.ObjectId, ref: 'Arrangement'}],
});

export interface InfoPost extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    location: string;
    index: number;
    draft: boolean;
    image: string;
    arrangement: string;
}
