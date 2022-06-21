import { Module } from '@nestjs/common';
import { ShorlinkController } from './shortlink.controller';
import { ShortlinkService } from './shortlink.service';

@Module({
  controllers: [ShorlinkController],
  providers: [ShortlinkService],
  exports: [ShortlinkService],
})
export class ShortlinkModule {}
