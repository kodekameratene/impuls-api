import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ArrangementsModule} from './arrangements/arrangements.module';
import {config} from 'dotenv';

config();

@Module({
    imports: [ArrangementsModule, MongooseModule.forRoot(`${process.env.mongoUri}`)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
