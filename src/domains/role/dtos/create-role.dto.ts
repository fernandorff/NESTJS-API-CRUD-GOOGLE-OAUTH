import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    description: string;

}