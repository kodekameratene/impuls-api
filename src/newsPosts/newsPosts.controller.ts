import { NewsPostsService } from "./newsPosts.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import _ = require("lodash");

@Controller("news")
export class NewsPostsController {
  constructor(private readonly newsPostsService: NewsPostsService) {}

  @Post()
  async addNewsPost(
    @Body("title") title: string,
    @Body("description") description: string,
    @Body("location") location: string,
    @Body("publishTime") publishTime: Date,
    @Body("image") image: string,
    @Body("secret") secret: boolean,
    @Body("arrangement") arrangement: string
  ) {
    const generatedId = await this.newsPostsService.insertNewsPost(
      title,
      description,
      location,
      publishTime,
      image,
      arrangement
    );
    return { id: generatedId };
  }

  @Get()
  async getAllNewsPosts(
    @Query("arrangement") arrangement: string,
    @Query("groupBy") groupBy: string,
    @Query("secrets") secrets: boolean
  ) {
    let newsPostsToReturn;
    if (arrangement) {
      newsPostsToReturn = await this.newsPostsService.getNewsPostsWithArrangement(
        arrangement
      );
    } else {
      newsPostsToReturn = await this.newsPostsService.getNewsPosts(secrets);
    }
    if (groupBy) {
      newsPostsToReturn = _.groupBy(newsPostsToReturn, groupBy);
    }
    return newsPostsToReturn;
  }

  @Get(":id")
  getNewsPost(@Param("id") id: string) {
    return this.newsPostsService.getNewsPost(id);
  }

  @Patch(":id")
  async updateNewsPost(
    @Param("id") id: string,
    @Body("title") title: string,
    @Body("description") description: string,
    @Body("location") location: string,
    @Body("publishTime") publishTime: Date,
    @Body("image") image: string,
    @Body("secret") secret: boolean,
    @Body("arrangement") arrangement: string
  ) {
    return await this.newsPostsService.updateNewsPost(
      id,
      title,
      description,
      location,
      publishTime,
      image,
      secret,
      arrangement
    );
  }

  @Delete(":id")
  async removeNewsPost(@Param("id") id: string) {
    return await this.newsPostsService.deleteNewsPost(id);
  }
}
