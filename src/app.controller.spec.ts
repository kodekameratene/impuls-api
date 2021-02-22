import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return greeting + some info about the API", () => {
      expect(appController.getHello()).toBe(
        "You have reached the Impuls API. Checkout the swagger documentation (/api) for more information on how to use this api."
      );
    });
  });
});
