import { IsString } from 'class-validator';

export class CreateSessionAttemptDto {
  @IsString()
  results: string;

  @IsString()
  userId: string;
}
