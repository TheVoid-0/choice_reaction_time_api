import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSessionAttemptDto } from './dto/create-session-attempt.dto';

@Injectable()
export class SessionAttemptService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(testSessionId: string, createSessionAttemptDto: CreateSessionAttemptDto) {
    return this.prismaService.sessionAttempt.create({ data: { ...createSessionAttemptDto, testSessionId } });
  }
}
