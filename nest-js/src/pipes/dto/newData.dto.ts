import { IsInt, IsString } from "class-validator";

export class newDataDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;
}