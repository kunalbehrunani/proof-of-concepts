import { Inject, Module } from "@nestjs/common";
import { someProvider } from "./di.provider";
import { logProvider } from "./providers/log.provider";
import { config } from "./providers/custom-provider.provider";


// Injectables are nothing but providers in Nest JS. Initially we declared services also using @Injectable Decorators however thats merely a naming convention. Idea is that we want to inject those dependicies into IoC container where they can be used within the module

// providers have module scope. Which means if module is created in "dependency-injection" (di.provider.ts) and imported in "dependencyInjection" module, the class - "someProvider" cannot be used outside this module. 

// If we want to use it outside this module, we need to add that provider in "exports" array while initializing our module.

@Module({
    imports: [],
    controllers: [],
    providers: [
        // standard-providers
        someProvider,
        logProvider,

        // custom-providers

        // custom-value providers (provide a constant value)
        { useValue: config['DB_CREDENTIALS'], provide: "DB_CREDENTIALS" }  
        
        // key - "provide" => it's the unique token for IoC container
        // key - "useValue" or "useClass" => that's the reference to object/class etc
        
        // This is the syntax for custom providers. We provide the value (key - useValue) & a unique Id (key - provide) so that nest js IoC container can store this object inside it's container and everytime we have to access this object, we need to provide this unique key


        // Ideally, for classes as well, we can use the same syntax
        // ie. { useClass: logProvider, provide: "logProvider"}
        // just that [ logProvider ] is a short hand for the above syntax, where in we are using the class name as the unique identifier for our IoC container.


        // 
    ],
    exports: [someProvider, logProvider, { useValue: config['DB_CREDENTIALS'], provide: "DB_CREDENTIALS" }]
})
export class dependencyInjection {

    // Eg of Dependency Injection: Below in our constructor, we didn't pass an instance of our provider - someProvider (by creating an object using "new" keyword). 

    // Instead we're justing passing the class - "someProvider". Since we've declared this in our providers (in module), Nest will automatically create an instance of this class and pass that into the constructor during initialization of our DI Module. 

    constructor (
        private readonly myProvider: someProvider,
        private readonly logger: logProvider,
        @Inject("DB_CREDENTIALS") private readonly myCrendtials: {DB_USER: string, DB_PASSWORD: string, DB_REGION: string}
        ) {
        // // console.log(myProvider.getSomeData());
        // logger.logError('Error in module - dependencyInjection');
        // logger.logInfo('Info in module - dependencyInjection');
        // logger.logWarn('Warn in module - dependencyInjection');

        // console.log({myCrendtials});
        logger.logInfo(myCrendtials.DB_USER)
        logger.logInfo(myCrendtials.DB_PASSWORD)
        logger.logInfo(myCrendtials.DB_REGION)
    }
}


// Since our module (which is a class) - "dependencyInjection" can be exported => in wherever module, this (our module - "dependencyInjection") is imported, there, it'll have access to only those providers which are mentioned in "exports" array (inside @Module decorator)

// And since modules are singletons, the very same instance will be exported and imported. 