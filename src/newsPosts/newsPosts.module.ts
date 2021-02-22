import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { NewsPostsController } from "./newsPosts.controller";
import { NewsPostsService } from "./newsPosts.service";
import { NewsPostSchema } from "./newsPost.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "NewsPost", schema: NewsPostSchema }]),
  ],
  controllers: [NewsPostsController],
  providers: [NewsPostsService],
})
export class NewsPostsModule {}
