import { Test, TestingModule } from '@nestjs/testing';
import { ArrangementsController } from './arrangements.controller';

describe('Arrangements Controller', () => {
  let controller: ArrangementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArrangementsController],
    }).compile();

    controller = module.get<ArrangementsController>(ArrangementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
