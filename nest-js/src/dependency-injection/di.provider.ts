import { Injectable } from "@nestjs/common";


// Injectable decorator allows us to inject an instance of this class into the Inversion of Control (container) in nest Js where it can be used anywhere in the module

// In other words, @Injectable decorator declares that this class - "someProvider" can be maintained by the Nest IoC Container

@Injectable()
export class someProvider {
    getSomeData(): {field1: string, field2: number} {
        return {
            field1: "Hello World",
            field2: 123456789
        };
    }
}