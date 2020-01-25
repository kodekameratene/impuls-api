import * as mongoose from 'mongoose';

export const NewsPostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    location: String,
    publishTime: Date,
    image: String,
    arrangement: [{type: mongoose.Schema.Types.ObjectId, ref: 'Arrangement'}],
});

export interface NewsPost extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    location: string;
    publishTime: Date;
    image: string;
    arrangement: string;
}
