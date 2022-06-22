import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateSessionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @Type(() => CreateUserDto)
  @ValidateNested()
  @IsNotEmptyObject()
  user: CreateUserDto;
}
