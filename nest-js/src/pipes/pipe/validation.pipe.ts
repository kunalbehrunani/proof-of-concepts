import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";


// Standard syntax - our custom pipe has to implement the PipeTransform class, and inside the class defintion, we need to call the "transform()" method which is ensure our PipeTransform requirements (kinda useful in initialization of PipeTransform class - super constructors)

@Injectable()
export class ValidationPipe implements PipeTransform {
    transform (value: string, metadata: ArgumentMetadata) {
       try {
           console.log('value: ', value, ' | typeof: ', typeof(value));
           console.log('metadata: ', metadata);
           const transformedValue = parseInt(value, 10);
           return transformedValue * 2;
       } catch (err) {
           throw new BadRequestException('Validation failed (Expecting numeric input');
       }
    }
}