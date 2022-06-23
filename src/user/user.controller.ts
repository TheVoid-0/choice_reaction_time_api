import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async save(@Body() createUserDto: CreateUserDto) {
    return this.userService.save(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listSessions(@Query('email') email: string) {
    return this.userService.listSessions(email);
  }
}
