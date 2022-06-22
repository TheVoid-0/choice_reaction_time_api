import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ShortlinkService } from 'src/shortlink/shortlink.service';
import { UserService } from 'src/user/user.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class TestSessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly shortlinkService: ShortlinkService,
    private readonly userService: UserService,
  ) {}

  // Cannot use prisma nested writes because azure cosmosDB doesn't support multiple transactions
  async create(createTestSessionDto: CreateSessionDto) {
    const { user: userDto, ...testSessionData } = createTestSessionDto;

    const user = await this.userService.save(userDto);

    const testSession = await this.prismaService.testSession.create({
      data: { ...testSessionData, userId: user.id },
    });

    const { shortlink } = await this.getShortlink(testSession.id);

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

  async getShortlink(id: string) {
    return this.shortlinkService.create(`${process.env.URL_WEB_TEST_SESSION}/${id}`);
  }
}
