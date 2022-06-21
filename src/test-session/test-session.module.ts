import { Module } from '@nestjs/common';
import { ShortlinkModule } from 'src/shortlink/shortlink.module';
import { SessionAttemptService } from './session-attempt/session-attempt.service';
import { TestSessionController } from './test-session.controller';
import { TestSessionService } from './test-session.service';

@Module({
  imports: [ShortlinkModule],
  controllers: [TestSessionController],
  providers: [TestSessionService, SessionAttemptService],
  exports: [TestSessionService, SessionAttemptService],
})
export class TestSessionModule {}
