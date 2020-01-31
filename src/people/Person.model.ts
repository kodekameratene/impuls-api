import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    location: String,
    index: Number,
    published: Boolean,
    image: String,
    arrangement: [{type: mongoose.Schema.Types.ObjectId, ref: 'Arrangement'}],
});

export interface Person extends mongoose.Document {
    id: string;
    name: string;
    description: string;
    location: string;
    index: number;
    published: boolean;
    image: string;
    arrangement: string;
}
