import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Posts } from "./posts.entity";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Posts])],
    controllers: [ PostsController ],
    providers: [ PostsService ]
}) export class PostsModule {
    constructor(private readonly postsService: PostsService) {
        postsService.addNewPost({
            title: 'Watch me play BGMI',
            description: 'Checkout my new post of BGMI full action',
            userId: 1001,
        });
    }
}