import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PeopleController } from "./People.controller";
import { PeopleService } from "./People.service";
import { PersonSchema } from "./Person.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Person", schema: PersonSchema }]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
