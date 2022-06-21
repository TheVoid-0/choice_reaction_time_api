import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma.service';
import { ShortlinkModule } from './shortlink/shortlink.module';
import { TestSessionModule } from './test-session/test-session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env', '.env.prod'],
    }),
    ThrottlerModule.forRoot({ limit: 3, ttl: 5000 }),
    DatabaseModule,
    UserModule,
    TestSessionModule,
    ShortlinkModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
