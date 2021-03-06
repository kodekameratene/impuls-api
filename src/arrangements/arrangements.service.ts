import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Arrangement } from "./arrangement.model";

@Injectable()
export class ArrangementsService {
  constructor(
    @InjectModel("Arrangement")
    private readonly arrangementModel: Model<Arrangement>
  ) {}

  async insertArrangement(
    title: string,
    description: string,
    location: string,
    startTime: Date,
    endTime: Date,
    image: string
  ) {
    const newArrangement = new this.arrangementModel({
      title,
      description,
      location,
      startTime,
      endTime,
      image,
    });
    const result = await newArrangement.save();
    return result.id as string;
  }

  async deleteArrangement(id: string) {
    const response = await this.arrangementModel.deleteOne({ _id: id }).exec();
    if (response.deletedCount < 1) {
      throw new NotFoundException("Could not find Arrangement");
    }
    return response;
  }

  async getArrangements() {
    const arrangements = await this.arrangementModel
      .find()
      .sort({ startTime: 1 })
      .exec();
    return arrangements.map((arrangement) => ({
      id: arrangement.id,
      title: arrangement.title,
      description: arrangement.description,
      location: arrangement.location,
      startTime: arrangement.startTime ? arrangement.startTime : null,
      endTime: arrangement.endTime ? arrangement.endTime : null,
      image: arrangement.image,
    }));
  }

  async getArrangement(id: string) {
    const arrangement = await this.findArrangement(id);
    return {
      id: arrangement.id,
      title: arrangement.title,
      description: arrangement.description,
      location: arrangement.location,
      startTime: arrangement.startTime,
      endTime: arrangement.endTime,
      image: arrangement.image,
    };
  }

  async updateArrangement(
    id: string,
    title: string,
    description: string,
    location: string,
    startTime: Date,
    endTime: Date,
    image: string
  ) {
    const updatedArrangement = await this.findArrangement(id);
    if (title) updatedArrangement.title = title;
    if (description) updatedArrangement.description = description;
    if (location) updatedArrangement.location = location;
    if (startTime) updatedArrangement.startTime = startTime;
    if (endTime) updatedArrangement.endTime = endTime;
    if (image) updatedArrangement.image = image;

    await updatedArrangement.save();
    return null;
  }

  private async findArrangement(id: string): Promise<Arrangement> {
    let arrangement: Arrangement | PromiseLike<Arrangement>;
    try {
      arrangement = await this.arrangementModel.findById(id).exec();
    } catch (e) {
      throw new NotFoundException("Could not find arrangement.");
    }
    if (!arrangement) {
      throw new NotFoundException("Could not find arrangement.");
    }
    return arrangement;
  }
}
