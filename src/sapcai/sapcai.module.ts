import { Module } from '@nestjs/common';
import { SapcaiController } from './sapcai.controller';
import { SapcaiService } from './sapcai.service';

@Module({
  controllers: [SapcaiController],
  providers: [SapcaiService],
})
export class SapcaiModule {}
