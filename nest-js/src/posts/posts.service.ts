import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Posts } from "./posts.entity";
import { PostInterface } from "./posts.interface";

// In order to create a service to access our data from DB, we need either the typeOrm entity manager or the repository of our entity. 
// Basic theory - typeOrm - dataSource has a property - "entity manager" which allows us to interact with all the entities in our project. This works but when we have lot of entities in our project, using "repositories" is a more convienent & organized approach. "repositories" are provided / imported from the dataSource object in typeOrm. We give an input (ie. an entity) to the DataSource.getRepository() method and it returns us a repository (aka  a sub-entity manager responsible for all operations with reference to the input entity). We use that repository to make all requests to our DB (table / entity) 

// Since we're creating a PostService, we need access to a repository linked to our entity "Posts". 

// We use @InjectRepository() decorator provided by "@nestjs/typeorm" module. We pass input - the entity (ie. Posts) and it retunrs us an instance of repository which we can use to make our calls to DB

@Injectable()
export class PostsService {
    constructor( @InjectRepository(Posts) private postRepository: Repository<Posts>) {}

    getAllPosts(): Promise<Posts[]> {
        return this.postRepository.find();
    }

    getPostByTitle(title: string): Promise<Posts> {
        return this.postRepository.findOneBy({title});
    }

    addNewPost(newPost: PostInterface): Promise<number> {
        const post = new Posts(/*newPost.userId, newPost.title, newPost.description*/);
        post.id = 1;
        post.userId = 1099;
        post.title = 'BGMI in action';
        post.description = 'Checkout my new post on BGMI gameplay';
        console.log('** PostsService => addNewPost, new post object instantiated: ', post);
        const resFromDb = this.postRepository.create(post);
        console.log('** PostsService => addNewPost - ', {resFromDb});
        return new Promise((resolve) => resolve(1));
    }
}