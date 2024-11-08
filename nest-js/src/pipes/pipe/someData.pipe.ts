/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class someDataPipe implements PipeTransform {
    transform(value: {id: number, name: string}, metadata: ArgumentMetadata) {
        console.log('in someDataPipe, value: ', value);
        if (value && value.id && value.name) {
            try {
                const transformedValue = {
                    id: parseInt(value.id.toString(), 10),
                    name: value.name.toString()
                }
                return transformedValue;
            } catch (err) {
                throw new BadRequestException('Validation dailed. Body should be an object with 2 fields - id (number) and name (string)');
            }
        }
        throw new BadRequestException('Validation failed. Missing parameter id or name');  
    }
}