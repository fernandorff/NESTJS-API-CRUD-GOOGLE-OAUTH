import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CreateSectorDto {
    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    description: string;
}