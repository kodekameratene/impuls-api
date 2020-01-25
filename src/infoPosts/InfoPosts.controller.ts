import {InfoPostsService} from './InfoPosts.service';
import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import _ = require('lodash');

@Controller('info')
export class InfoPostsController {
    constructor(private readonly infoPostsService: InfoPostsService) {
    }

    @Post()
    async addInfoPost(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('location') location: string,
        @Body('published') published: boolean,
        @Body('index') index: number,
        @Body('image') image: string,
        @Body('arrangement') arrangement: string,
    ) {
        const generatedId = await this.infoPostsService.insertInfoPost(
            title,
            description,
            location,
            published,
            index,
            image,
            arrangement,
        );
        return {id: generatedId};
    }

    @Get()
    async getAllInfoPosts(
        @Query('arrangement') arrangement: string,
        @Query('groupBy') groupBy: string,
    ) {
        let infoPostsToReturn;
        if (arrangement) {
            infoPostsToReturn = await this.infoPostsService.getInfoPostsWithArrangement(arrangement);
        } else {
            infoPostsToReturn = await this.infoPostsService.getInfoPosts();
        }
        if (groupBy) {
            infoPostsToReturn = _.groupBy(infoPostsToReturn, groupBy);
        }
        return infoPostsToReturn;
    }

    @Get(':id')
    getInfoPost(@Param('id') id: string) {
        return this.infoPostsService.getInfoPost(id);
    }

    @Patch(':id')
    async updateInfoPost(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('location') location: string,
        @Body('published') published: boolean,
        @Body('index') index: number,
        @Body('image') image: string,
        @Body('arrangement') arrangement: string,
    ) {
        return await this.infoPostsService.updateInfoPost(id, title, description, location, index, published, image, arrangement);
    }

    @Delete(':id')
    async removeInfoPost(@Param('id') id: string) {
        return await this.infoPostsService.deleteInfoPost(id);
    }
}
