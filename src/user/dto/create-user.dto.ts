import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  @IsString()
  email: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  age?: number;
}
