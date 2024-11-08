import { Module } from "@nestjs/common";
import { PipesController } from "./pipes.controller";
import { PipesService } from "./pipes.service";

@Module({
    imports: [],
    controllers: [PipesController],
    providers: [PipesService]
})
export class PipesModule {
    constructor () {
        console.log('PipesModule Instantiated');
    }
}