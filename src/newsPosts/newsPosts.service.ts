import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { NewsPost } from "./newsPost.model";

@Injectable()
export class NewsPostsService {
  constructor(
    @InjectModel("NewsPost") private readonly newsPostModel: Model<NewsPost>
  ) {}

  async insertNewsPost(
    title: string,
    description: string,
    location: string,
    publishTime: Date,
    image: string,
    arrangement: string
  ) {
    const newNewsPost = new this.newsPostModel({
      title,
      description,
      location,
      publishTime: publishTime !== null ? publishTime : new Date(Date.now()), // Setting publish-time to now if not provided
      image,
      arrangement,
    });
    const result = await newNewsPost.save();
    return result.id as string;
  }

  async deleteNewsPost(id: string) {
    const response = await this.newsPostModel.deleteOne({ _id: id }).exec();
    if (response.deletedCount < 1) {
      throw new NotFoundException("Could not find NewsPost");
    }
    return response;
  }

  async getNewsPosts(secrets: boolean) {
    const today = new Date(Date.now());
    const newsPosts = await this.newsPostModel
      // .find()
      .find({ publishTime: { $lte: today } })
      .sort({ publishTime: -1 })
      .exec();
    return newsPosts
      .map((newsPost) => ({
        id: newsPost.id,
        title: newsPost.title,
        description: newsPost.description,
        location: newsPost.location,
        publishTime: newsPost.publishTime,
        image: newsPost.image,
        secret: newsPost.secret,
        arrangement: newsPost.arrangement,
      }))
      .filter((post) => {
        return secrets ? true : !post.secret;
      });
  }

  async getNewsPostsWithArrangement(arrangement) {
    const newsPosts = await this.newsPostModel
      .find({ arrangement })
      .sort({ publishTime: 1 })
      .exec();
    return newsPosts.map((newsPost) => ({
      id: newsPost.id,
      title: newsPost.title,
      description: newsPost.description,
      location: newsPost.location,
      publishTime: newsPost.publishTime ? newsPost.publishTime : null,
      image: newsPost.image,
      arrangement: newsPost.arrangement,
    }));
  }

  async getNewsPost(id: string) {
    const newsPost = await this.findNewsPost(id);
    return {
      id: newsPost.id,
      title: newsPost.title,
      description: newsPost.description,
      location: newsPost.location,
      publishTime: newsPost.publishTime,
      image: newsPost.image,
      arrangement: newsPost.arrangement,
    };
  }

  async updateNewsPost(
    id: string,
    title: string,
    description: string,
    location: string,
    publishTime: Date,
    image: string,
    secret: boolean,
    arrangement: string
  ) {
    const updatedNewsPost = await this.findNewsPost(id);
    if (title) {
      updatedNewsPost.title = title;
    }
    if (description) {
      updatedNewsPost.description = description;
    }
    if (location) {
      updatedNewsPost.location = location;
    }
    if (publishTime) {
      updatedNewsPost.publishTime = publishTime;
    }
    if (image) {
      updatedNewsPost.image = image;
    }
    if (secret) {
      updatedNewsPost.secret = secret;
    }
    if (arrangement) {
      updatedNewsPost.arrangement = arrangement;
    }
    await updatedNewsPost.save();
    return null;
  }

  private async findNewsPost(id): Promise<NewsPost> {
    let newsPost;
    try {
      newsPost = await this.newsPostModel.findById(id).exec();
    } catch (e) {
      throw new NotFoundException("Could not find newsPost.");
    }
    if (!newsPost) {
      throw new NotFoundException("Could not find newsPost.");
    }
    return newsPost;
  }
}
