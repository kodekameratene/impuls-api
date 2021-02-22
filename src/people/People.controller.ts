import { PeopleService } from "./People.service";
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

@Controller("people")
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  async addPerson(
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("location") location: string,
    @Body("published") published: boolean,
    @Body("index") index: number,
    @Body("image") image: string,
    @Body("arrangement") arrangement: string
  ) {
    const generatedId = await this.peopleService.insertPerson(
      name,
      description,
      location,
      published,
      index,
      image,
      arrangement
    );
    return { id: generatedId };
  }

  @Get()
  async getAllPeople(
    @Query("arrangement") arrangement: string,
    @Query("groupBy") groupBy: string
  ) {
    let peopleToReturn;
    if (arrangement) {
      peopleToReturn = await this.peopleService.getPeopleWithArrangement(
        arrangement
      );
    } else {
      peopleToReturn = await this.peopleService.getPeople();
    }
    if (groupBy) {
      peopleToReturn = _.groupBy(peopleToReturn, groupBy);
    }
    return peopleToReturn;
  }

  @Get(":id")
  getPerson(@Param("id") id: string) {
    return this.peopleService.getPerson(id);
  }

  @Patch(":id")
  async updatePerson(
    @Param("id") id: string,
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("location") location: string,
    @Body("published") published: boolean,
    @Body("index") index: number,
    @Body("image") image: string,
    @Body("arrangement") arrangement: string
  ) {
    return await this.peopleService.updatePerson(
      id,
      name,
      description,
      location,
      index,
      published,
      image,
      arrangement
    );
  }

  @Delete(":id")
  async removePerson(@Param("id") id: string) {
    return await this.peopleService.deletePerson(id);
  }
}
