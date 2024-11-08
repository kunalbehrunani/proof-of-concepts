import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatService } from './cat/cat.service';
import {ProductModule} from './product/product.module';
import { PostsModule } from './posts/posts.module';
import { dependencyInjection } from './dependency-injection/di.module';



// cat
import { catController } from './cat/cat.controller';
import { someProvider } from './dependency-injection/di.provider';
import { logProvider } from './dependency-injection/providers/log.provider';
import { PipesModule } from './pipes/pipes.module';
import { typeOrmModule } from './type-orm/type-orm.module';



// controllers always belong to modules. It's through modules, nest identifies the controllers. Hence add the controller to the module decorater.
@Module({
    // import another module into current module. That's how we link our whole nest js application. Bink multiple modules into our main module (AppModule)
  imports: [ProductModule, dependencyInjection, PipesModule, typeOrmModule, PostsModule],

   // these control the incoming requests in our application. Responsible for returning a response.
  controllers: [AppController, catController], 

   // These are extra services / or basic classes that basically provide some extra service/functionality to support the controllers actions. eg. connection with DB, fetching records etc.
  providers: [AppService, CatService], 
})
export class AppModule {

  constructor(
    private readonly myNewExportedProvider: someProvider,
    private readonly logger: logProvider) {
    console.log(myNewExportedProvider.getSomeData());

    // Injecting providers from other module using "imports" & "exports" keywords in @Module decorator.
    logger.logError('Error in AppModule');
    logger.logInfo('Info in AppModule');
    logger.logWarn('Warn in AppModule');
  }

} 
// In here, our AppModule is nothing but an empty class. All the configurations are done via decorator - @Module (provided by Nest JS). It's an decorator that should be attached to a class. And in it, we pass an object to configure the module. 

// Behind the scenes => attaching that decorator (with the passed argument ie. our object with 3 fields - imports, controllers & providers etc) willl attach some meta data (more complex code) to our empty class AppModule to make it work its way.
