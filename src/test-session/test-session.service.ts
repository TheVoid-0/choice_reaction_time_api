import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ShortlinkService } from 'src/shortlink/shortlink.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class TestSessionService {
  constructor(private readonly prismaService: PrismaService, private readonly shortlinkService: ShortlinkService) {}

  async create(createTestSessionDto: CreateSessionDto) {
    const testSession = await this.prismaService.testSession.create({
      data: createTestSessionDto,
    });

    const { shortlink } = await this.shortlinkService.create(`${process.env.URL_WEB_TEST_SESSION}/test-sessions/${testSession.id}`);

    return this.prismaService.testSession.update({
      data: { shortlink },
      where: { id: testSession.id },
    });
  }

  async get(id: string) {
    return this.prismaService.testSession.findUnique({
      include: { owner: true, testAttempts: true },
      where: { id },
    });
  }
}
