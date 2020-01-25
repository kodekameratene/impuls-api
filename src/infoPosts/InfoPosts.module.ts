import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {InfoPostsController} from './InfoPosts.controller';
import {InfoPostsService} from './InfoPosts.service';
import {InfoPostSchema} from './infoPost.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'InfoPost', schema: InfoPostSchema},
        ]),
    ],
    controllers: [InfoPostsController],
    providers: [InfoPostsService],
})
export class InfoPostsModule {
}
