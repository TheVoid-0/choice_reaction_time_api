import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionAttempt } from '@prisma/client';
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
    const session = await this.prismaService.testSession.findUnique({
      include: { owner: true, testAttempts: { include: { user: true } } },
      where: { id },
    });

    if (!session) throw new NotFoundException();
    const sessionResultsByAge = session.testAttempts.reduce((testsAcc, testAttempt) => {
      const results = JSON.parse(testAttempt.results?.toString() ?? '{}') as Record<number, number>;
      const {
        user: { age },
      } = testAttempt;
      const resultsValues = Object.values(results);
      const ageInUse = age ?? 0;

      // Agrupa por idade e calcula a média das tentativas
      if (!testsAcc[ageInUse]) {
        testsAcc[ageInUse] = {
          attempts: [{ ...testAttempt, avg: this.getAvg(Object.values(resultsValues)) }],
          avg: 0,
        };
        return testsAcc;
      }
      testsAcc[ageInUse].attempts.push({ ...testAttempt, avg: this.getAvg(Object.values(resultsValues)) });

      return testsAcc;
    }, {} as Record<string, { attempts: Array<SessionAttempt & { avg: number }>; avg: number }>);

    for (const results of Object.values(sessionResultsByAge)) {
      results.avg = this.getAvg(results.attempts.map(attempt => attempt.avg));
    }

    return {
      ...session,
      testAttempts: sessionResultsByAge,
    };
  }

  async getShortlink(id: string) {
    return this.shortlinkService.create(`${process.env.URL_WEB_TEST_SESSION}?sessionId=${id}`);
  }

  private getAvg(numbers: number[]): number {
    return numbers.reduce((acc, val, i) => {
      acc += val;
      return i < numbers.length ? acc : acc / numbers.length;
    }, 0);
  }
}
