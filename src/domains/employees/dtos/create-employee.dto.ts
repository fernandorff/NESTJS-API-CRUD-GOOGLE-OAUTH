import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/domains/users/entities/user.entity';

export class CreateEmployeeDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: 'Fulano' })
  name: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: '12312312312' })
  cpf: string;
  
  @Expose()
  @IsString()
  @ApiProperty({ example: '991060504' })
  phone: string;

  @IsString()
  @ApiProperty({ example: 'ede0ad05-7f84-4e74-9e0a-bba399bb3aa2' })
  idSector: string;

  @IsString()
  @ApiProperty({ example: 'ede0ad05-7f84-4e74-9e0a-bba399bb3aa2' })
  idRole: string;

  @IsString()
  @ApiProperty({ example: 'ede0ad05-7f84-4e74-9e0a-bba399bb3aa2' })
  idUser: string;

}
