import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "You have reached the Impuls API. Checkout the swagger documentation (/api) for more information on how to use this api.";
  }
}
