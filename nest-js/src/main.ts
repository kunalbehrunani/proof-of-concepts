import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // KB: by default, nest application exits with code 1 whenever an error is encountered. With abortOnError = false, error will be thrown and app will not exit.
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(3000);

  // KB: This is very similar to Express. In it, we instantiate the express() to create an app instance and then we call app.listen(). The only difference it, in express, we don't pass any AppModule.




  // mySqlDataSource.initialize().then(() => {
  //   console.log('Hi! Connected to mysql database!');
  // }).catch((error: any) => {
  //   console.log('Error in connecting to mySqlDataSource: ', error);
  // });


  // 
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
