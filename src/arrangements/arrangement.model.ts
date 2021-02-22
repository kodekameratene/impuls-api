import * as mongoose from "mongoose";

export const ArrangementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  startTime: Date,
  endTime: Date,
  image: String,
});

export interface Arrangement extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  image: string;
}
