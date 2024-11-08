import { Injectable } from "@nestjs/common";

@Injectable()
export class PipesService {
    getNumberById(id: number): string {
        const data = {
            1: 'One',
            2: 'Two',
            3: 'Three',
            4: 'Four',
        };
        return (data[id]) ? (data[id]) : id.toString();
    }
}