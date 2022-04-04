import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from './dto/send-message.dto';
import { SapcaiService } from './sapcai.service';
import { Role } from '@virtual-me/virtual-me-ts-core';
import { UserService } from '../user/user.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { firstValueFrom } from 'rxjs';

@ApiTags('SAP CAI')
@Controller('sapcai')
export class SapcaiController {
  constructor(
    private sapCaiService: SapcaiService,
    private userService: UserService,
  ) {}

  @Roles(Role.GUEST, Role.USER)
  @Post()
  async dialog(@Body() sendMessageDto: SendMessageDto, @Req() req) {
    const dialogRequest = {
      conversation_id: 'test-1lml1710783036',
      message: {
        type: 'text',
        content: 'Bonjour',
      },
    };
    const res = await firstValueFrom(
      this.sapCaiService.dialogWithRefresh(dialogRequest),
    );
    return res.data.results;
  }
}
