import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SapcaiController } from './sapcai.controller';
import { SapcaiService } from './sapcai.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [HttpModule, UserModule],
  controllers: [SapcaiController],
  providers: [SapcaiService],
})
export class SapcaiModule {}
