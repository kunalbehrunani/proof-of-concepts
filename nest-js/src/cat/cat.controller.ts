// @Controller is a class decorator => it'll be followed by a class definition
// @Get is a method decorator => it'll be followed by a method defintion
import { Controller, Get, Res, Req, Header, Param, Query, Post, Body } from '@nestjs/common';
import { rejects } from 'assert';
import { Request, Response, query, response } from 'express';
import { version } from 'os';
import { resolve } from 'path';
import { catDto } from './cat.dto';
import { CatService } from './cat.service';

import { myRequest } from './interfaces/request.interface';

// decorator @Controller is required to create a nest JS Simple controller. An (optional) input of path prefix (eg. 'cat') to the decorator will assign this controller to the route path of '/cat'. This is useful to group similar routes. Further when we define the class inside this controller, we can add additional paths to map the exact routes to the given controllers. 

@Controller('cat')
// to create a controller, we use JS classes + decorator. Decorater will take the class and create a routing map that enables nest JS to map this controller to receive the requests destined for this particular controller.
export class catController {

  constructor(private catsService: CatService) {}

  // @Get is also a http request 'method' decorator 
  // this will tell nest js to create a handler method to handle the http requests for this given route
  @Get('getAllCats/:id')
  @Header('testHeader', 'helloworld')
  getAllCatsFunc(
    @Param() params: object,
    @Param('id') id: number,
    @Query() query: object,
    @Req() request: Request,
    @Res() response: Response
  ) {
    console.log('Params: ', params);
    console.log('Query: ', query);
    console.log('id: ', id);
    response.status(200).send(['cat1', 'cat2', 'cat3', 'cat4']);

  }

  // every async method has to return a promise.
  @Get('getAllCatsAsync')
  async getAllCatsAsync(
    @Query('id') id: string,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (parseInt(id, 10) === 1) {
        response.status(200).send(['cat1', 'cat2', 'cat3', 'cat4']);
        resolve('success');
      } else {
        response.status(400).send('Bad Request');
        reject('failure');
      }
    });
  }

  @Post('createNewCat')
  async createNewCatAsync(
    @Body() createCatDto: catDto
  ): Promise<string> {
    console.log('createCatDto: ', createCatDto);
    return new Promise((resolve, reject) => {
      resolve('success');
    })
  }



  @Post('cat')
  async createCat(@Body() newCat: catDto) {
    this.catsService.create(newCat);
  }

  @Get('cat')
  async getCat() {
    return this.catsService.findAll();
  }
}