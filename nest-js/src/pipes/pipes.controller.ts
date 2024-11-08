import { Body, Controller, Get, Param, ParseIntPipe, Post, Req } from "@nestjs/common";
import { PipesService } from "./pipes.service";

import { ValidationPipe } from './pipe/validation.pipe';
import { someDataPipe } from './pipe/someData.pipe';

import { someDataDto } from './dto/somedata.dto';
import { newDataDto } from "./dto/newData.dto";


@Controller('pipes')
export class PipesController {
    constructor (private readonly pipesService: PipesService) {
        console.log('PipesController Instantiated');
    }

    // client can pass any value for 'id'. Since we have handling only for numbers, either we need to manually add the checks and throw exceptions accordingly.
    @Get('/:id')
    getDetails (@Param('id') id: number) {
        // Even when a numeric value is passed, it's is received here as a string
        console.log('id: ', id, 'typeof: ', typeof(id));
        return this.pipesService.getNumberById(id);
    }





    // BUILT IN PIPES

    // using pipes => we ensure, input id will be only "NUMBER"
    // Idea - ParseIntPipe => attempting parsing the input parameter 'id'. If success => go futher => else throw exception
    @Get('v2/:id')
    getDetailsV2 (@Param('id', ParseIntPipe) id: number) {
        console.log('V2 - id: ', id);
        return this.pipesService.getNumberById(id);
    }






    // CUSTOM BUILT PIPES

    // Built a custom validation pipe which transforms the input value - converts string to num & returns value multiplied by 2
    @Get('v3/:id')
    getDetailsV3 (@Param('id', ValidationPipe) id: number) {
        console.log('V3 - id: ', id);
        return this.pipesService.getNumberById(id);
    }

    // without pipes => no validation on req body - "data" (ideally it should be exact as someDataDto)
    @Post('v1/addSomeData')
    addSomeData(@Body() data: someDataDto): string {
        console.log(data);
        return 'Success';
    }

    // here, we have added our custom data pipe - k/as "someDataPipe". It's an injectable class where use the transform function to identify the value and add our custom handling to validate if the input request has valid fields or not?
    // Note - we can pass an instance of our pipe into the @Body decorator. 
    // eg. @Body (new someDataPipe())
    // or
    // just pass the class, Nest IoC will automatically initialize it. 
    @Post('v2/addSomeData')
    addSomeDataV2 (@Body(someDataPipe) data: someDataDto): string {
        console.log('in controller, data: ', data);
        return 'Success';
    }








    // SCHEMA BASED PIPES

    // The above case where we build an validation class is okay to handle validations for input objects. But the catch is that we've to call this validation class everytime we want to validate. What if we could add validations right at the declaration of the DTOs ? 

    // Having a middleware is also usefull but middlewares in JS do not have access to the execution context, so they don't know what is going to be called next. And so, on, we have to maintain our middlewares at every step where we need the validation. 

    // It's done using Joi Library







    // Class validator
    @Post('v1/addNewData')
    addSomeDataV4 (@Body() newData: newDataDto): string {
        console.log('newData: ', newData);
        return 'Success';
    }
}