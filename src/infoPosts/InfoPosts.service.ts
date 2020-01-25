import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {InfoPost} from './infoPost.model';

@Injectable()
export class InfoPostsService {

    constructor(
        @InjectModel('InfoPost') private readonly infoPostModel: Model<InfoPost>,
    ) {
    }

    async insertInfoPost(
        title: string,
        description: string,
        location: string,
        draft: boolean,
        index: number,
        image: string,
        arrangement: string,
    ) {
        const newInfoPost = new this.infoPostModel({
                title,
                description,
                location,
                draft,
                index,
                image,
                arrangement,
            })
        ;
        const result = await newInfoPost.save();
        return result.id as string;
    }

    async deleteInfoPost(id: string) {
        const response = await this.infoPostModel.deleteOne({_id: id}).exec();
        if (response.deletedCount < 1) {
            throw new NotFoundException('Could not find InfoPost');
        }
        return response;
    }

    async getInfoPosts() {
        const infoPosts = await this.infoPostModel.find().sort({publishTime: 1}).exec();
        return infoPosts
            .map(infoPost => ({
                id: infoPost.id,
                title: infoPost.title,
                description: infoPost.description,
                location: infoPost.location,
                index: infoPost.index,
                draft: infoPost.draft,
                image: infoPost.image,
                arrangement: infoPost.arrangement,
            }));
    }

    async getInfoPostsWithArrangement(arrangement) {
        const infoPosts = await this.infoPostModel.find({arrangement}).sort({publishTime: 1}).exec();
        return infoPosts
            .map(infoPost => ({
                id: infoPost.id,
                title: infoPost.title,
                description: infoPost.description,
                location: infoPost.location,
                index: infoPost.index,
                draft: infoPost.draft,
                image: infoPost.image,
                arrangement: infoPost.arrangement,
            }));
    }

    async getInfoPost(id: string) {
        const infoPost = await this.findInfoPost(id);
        return ({
            id: infoPost.id,
            title: infoPost.title,
            description: infoPost.description,
            location: infoPost.location,
            index: infoPost.index,
            draft: infoPost.draft,
            image: infoPost.image,
            arrangement: infoPost.arrangement,
        });
    }

    async updateInfoPost(
        id: string,
        title: string,
        description: string,
        location: string,
        index: number,
        draft: boolean,
        image: string,
        arrangement: string,
    ) {
        const updatedInfoPost = await this.findInfoPost(id);
        if (title) {
            updatedInfoPost.title = title;
        }
        if (description) {
            updatedInfoPost.description = description;
        }
        if (location) {
            updatedInfoPost.location = location;
        }
        if (draft) {
            updatedInfoPost.draft = draft;
        }
        if (index) {
            updatedInfoPost.index = index;
        }
        if (image) {
            updatedInfoPost.image = image;
        }
        if (arrangement) {
            updatedInfoPost.arrangement = arrangement;
        }
        await updatedInfoPost.save();
        return null;
    }

    private async findInfoPost(id): Promise<InfoPost> {
        let infoPost;
        try {
            infoPost = await this.infoPostModel.findById(id).exec();
        } catch (e) {
            throw new NotFoundException('Could not find infoPost.');
        }
        if (!infoPost) {
            throw new NotFoundException('Could not find infoPost.');
        }
        return infoPost;
    }
}
