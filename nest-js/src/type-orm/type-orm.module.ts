import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Posts } from "../posts/posts.entity";



@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '172.31.11.206',
            port: 6033,
            username: 'rooter_broadcast_prod',
            password: 'dWlmYWZhdWlpdmFm',
            database: 'rooter_broadcast',
            entities: [Posts],
            synchronize: true,
            retryAttempts: 5,
            retryDelay: 3000,
            autoLoadEntities: false
        })
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class typeOrmModule {}