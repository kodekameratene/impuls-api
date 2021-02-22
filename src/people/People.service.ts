import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Person } from "./Person.model";

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel("Person") private readonly personModel: Model<Person>
  ) {}

  async insertPerson(
    name: string,
    description: string,
    location: string,
    published: boolean,
    index: number,
    image: string,
    arrangement: string
  ) {
    const newPerson = new this.personModel({
      name,
      description,
      location,
      published,
      index,
      image,
      arrangement,
    });
    const result = await newPerson.save();
    return result.id as string;
  }

  async deletePerson(id: string) {
    const response = await this.personModel.deleteOne({ _id: id }).exec();
    if (response.deletedCount < 1) {
      throw new NotFoundException("Could not find Person");
    }
    return response;
  }

  async getPeople() {
    const persons = await this.personModel
      .find({ published: true })
      .sort({ index: 1 })
      .exec();
    return persons.map((person) => ({
      id: person.id,
      name: person.name,
      description: person.description,
      location: person.location,
      index: person.index,
      published: person.published,
      image: person.image,
      arrangement: person.arrangement,
    }));
  }

  async getPeopleWithArrangement(arrangement) {
    const persons = await this.personModel
      .find({ arrangement, published: true })
      .sort({ index: 1 })
      .exec();
    return persons.map((person) => ({
      id: person.id,
      name: person.name,
      description: person.description,
      location: person.location,
      index: person.index,
      published: person.published,
      image: person.image,
      arrangement: person.arrangement,
    }));
  }

  async getPerson(id: string) {
    const person = await this.findPerson(id);
    return {
      id: person.id,
      name: person.name,
      description: person.description,
      location: person.location,
      index: person.index,
      published: person.published,
      image: person.image,
      arrangement: person.arrangement,
    };
  }

  async updatePerson(
    id: string,
    name: string,
    description: string,
    location: string,
    index: number,
    published: boolean,
    image: string,
    arrangement: string
  ) {
    const updatedPerson = await this.findPerson(id);
    if (name) {
      updatedPerson.name = name;
    }
    if (description) {
      updatedPerson.description = description;
    }
    if (location) {
      updatedPerson.location = location;
    }
    if (published) {
      updatedPerson.published = published;
    }
    if (index) {
      updatedPerson.index = index;
    }
    if (image) {
      updatedPerson.image = image;
    }
    if (arrangement) {
      updatedPerson.arrangement = arrangement;
    }
    await updatedPerson.save();
    return null;
  }

  private async findPerson(id): Promise<Person> {
    let person;
    try {
      person = await this.personModel.findById(id).exec();
    } catch (e) {
      throw new NotFoundException("Could not find person.");
    }
    if (!person) {
      throw new NotFoundException("Could not find person.");
    }
    return person;
  }
}
