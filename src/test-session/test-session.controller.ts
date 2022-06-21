import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { CreateSessionAttemptDto } from './session-attempt/dto/create-session-attempt.dto';
import { SessionAttemptService } from './session-attempt/session-attempt.service';
import { TestSessionService } from './test-session.service';

@Controller('test-sessions')
export class TestSessionController {
  constructor(private readonly testSessionService: TestSessionService, private readonly sessionAttemptService: SessionAttemptService) {}

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.testSessionService.create(createSessionDto);
  }

  @Post(':id/attempts')
  async createAttempt(@Param('id') id: string, @Body() createSessionAttemptDto: CreateSessionAttemptDto) {
    return this.sessionAttemptService.create(id, createSessionAttemptDto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.testSessionService.get(id);
  }
}
