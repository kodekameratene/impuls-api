import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { InfoPost } from "./infoPost.model";

@Injectable()
export class InfoPostsService {
  constructor(
    @InjectModel("InfoPost") private readonly infoPostModel: Model<InfoPost>
  ) {}

  async insertInfoPost(
    title: string,
    description: string,
    location: string,
    published: boolean,
    index: number,
    image: string,
    secret: boolean,
    arrangement: string
  ) {
    const newInfoPost = new this.infoPostModel({
      title,
      description,
      location,
      published,
      index,
      image,
      secret,
      arrangement,
    });
    const result = await newInfoPost.save();
    return result.id as string;
  }

  async deleteInfoPost(id: string) {
    const response = await this.infoPostModel.deleteOne({ _id: id }).exec();
    if (response.deletedCount < 1) {
      throw new NotFoundException("Could not find InfoPost");
    }
    return response;
  }

  async getInfoPosts(secrets: boolean) {
    const infoPosts = await this.infoPostModel
      .find({ published: true })
      .sort({ index: 1 })
      .exec();
    return infoPosts
      .map((infoPost) => ({
        id: infoPost.id,
        title: infoPost.title,
        description: infoPost.description,
        location: infoPost.location,
        index: infoPost.index,
        published: infoPost.published,
        image: infoPost.image,
        secret: infoPost.secret,
        arrangement: infoPost.arrangement,
      }))
      .filter((post) => {
        return secrets ? true : !post.secret;
      });
  }

  async getInfoPostsWithArrangement(arrangement) {
    const infoPosts = await this.infoPostModel
      .find({ arrangement, published: true })
      .sort({ index: 1 })
      .exec();
    return infoPosts.map((infoPost) => ({
      id: infoPost.id,
      title: infoPost.title,
      description: infoPost.description,
      location: infoPost.location,
      index: infoPost.index,
      published: infoPost.published,
      image: infoPost.image,
      arrangement: infoPost.arrangement,
    }));
  }

  async getInfoPost(id: string) {
    const infoPost = await this.findInfoPost(id);
    return {
      id: infoPost.id,
      title: infoPost.title,
      description: infoPost.description,
      location: infoPost.location,
      index: infoPost.index,
      published: infoPost.published,
      image: infoPost.image,
      arrangement: infoPost.arrangement,
    };
  }

  async updateInfoPost(
    id: string,
    title: string,
    description: string,
    location: string,
    index: number,
    published: boolean,
    image: string,
    secret: boolean,
    arrangement: string
  ) {
    const updatedInfoPost = await this.findInfoPost(id);
    if (title !== undefined) {
      updatedInfoPost.title = title;
    }
    if (description !== undefined) {
      updatedInfoPost.description = description;
    }
    if (location !== undefined) {
      updatedInfoPost.location = location;
    }
    if (published !== null) {
      updatedInfoPost.published = published;
    }
    if (index !== undefined) {
      updatedInfoPost.index = index;
    }
    if (image !== undefined) {
      updatedInfoPost.image = image;
    }
    if (secret !== null) {
      updatedInfoPost.secret = secret;
    }
    if (arrangement !== undefined) {
      updatedInfoPost.arrangement = arrangement;
    }
    await updatedInfoPost.save();
    return null;
  }

  private async findInfoPost(id): Promise<InfoPost> {
    let infoPost;
    try {
      infoPost = await this.infoPostModel.findById(id).exec();
    } catch (e) {
      throw new NotFoundException("Could not find infoPost.");
    }
    if (!infoPost) {
      throw new NotFoundException("Could not find infoPost.");
    }
    return infoPost;
  }
}
