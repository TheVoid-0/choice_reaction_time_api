import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  save(userDto: CreateUserDto) {
    const user = this.prismaService.user.upsert({
      create: userDto,
      update: userDto,
      where: { email: userDto.email },
    });

    return user;
  }
}
