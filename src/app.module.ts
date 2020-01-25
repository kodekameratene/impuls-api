import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ArrangementsModule} from './arrangements/arrangements.module';
import {config} from 'dotenv';
import {EventsModule} from './events/events.module';
import {NewsPostsModule} from './newsPosts/newsPosts.module';
import {InfoPostsModule} from './infoPosts/InfoPosts.module';

config();

@Module({
    imports: [ArrangementsModule, EventsModule, NewsPostsModule, InfoPostsModule, MongooseModule.forRoot(`${process.env.mongoUri}`)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
