import { Test, TestingModule } from '@nestjs/testing';
import { NewsPostsController } from './newsPosts.controller';

describe('NewsPosts Controller', () => {
  let controller: NewsPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsPostsController],
    }).compile();

    controller = module.get<NewsPostsController>(NewsPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
