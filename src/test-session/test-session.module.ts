import { Module } from '@nestjs/common';
import { ShortlinkModule } from 'src/shortlink/shortlink.module';
import { UserModule } from 'src/user/user.module';
import { SessionAttemptService } from './session-attempt/session-attempt.service';
import { TestSessionController } from './test-session.controller';
import { TestSessionService } from './test-session.service';

@Module({
  imports: [ShortlinkModule, UserModule],
  controllers: [TestSessionController],
  providers: [TestSessionService, SessionAttemptService],
  exports: [TestSessionService, SessionAttemptService],
})
export class TestSessionModule {}
