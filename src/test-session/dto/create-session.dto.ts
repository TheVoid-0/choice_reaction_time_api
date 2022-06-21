import { IsOptional, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  userId: string;
}
