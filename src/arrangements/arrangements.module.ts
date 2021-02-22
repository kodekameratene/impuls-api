import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ArrangementsController } from "./arrangements.controller";
import { ArrangementsService } from "./arrangements.service";
import { ArrangementSchema } from "./arrangement.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Arrangement", schema: ArrangementSchema },
    ]),
  ],
  controllers: [ArrangementsController],
  providers: [ArrangementsService],
})
export class ArrangementsModule {}
