import { Test, TestingModule } from '@nestjs/testing';
import { InfoPostsController } from './InfoPosts.controller';

describe('InfoPosts Controller', () => {
  let controller: InfoPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoPostsController],
    }).compile();

    controller = module.get<InfoPostsController>(InfoPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
