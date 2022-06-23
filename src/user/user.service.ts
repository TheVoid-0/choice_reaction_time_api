import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  save(userDto: CreateUserDto) {
    return this.prismaService.user.upsert({
      create: userDto,
      update: userDto,
      where: { email: userDto.email },
    });
  }

  listSessions(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { sessions: true, attempts: true },
    });
  }
}
