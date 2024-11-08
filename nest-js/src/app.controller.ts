import { Controller, Get, Head, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // Ideally, in express, we access the req & the res object and we mostly attach the result with the res object (eg. res.send() or res.status() or res.json() etc...). But in nest js, it is already handled via the @Get decorator. since it's a method type decorator, we attach a method to it and our task is to just return the result via this method. The routing path ie. how the result (returned from our func) will reach the client (via http response) is handled by this @Get decorator.

    // Additionally, via the return type of our method (attached to @Get decorator), some default header are attached by Nest JS. eg. since our return type is "string", a header of 'content-type' is added as 'text/html'.

    return this.appService.getHello();
  }


  @Get('/hi')
  @Header('Content-Type', 'text/html')
  sayHi(): {message: string} {
    // In this case, since we're returning an object, if we do not pass this method to the @Header decorator as well (to manipulate our response header), the by default header passed is 'application/json'. And when we attach this method manually, the passed one is 'text/html'.
    return {message: "Hi There"};
  }
}
