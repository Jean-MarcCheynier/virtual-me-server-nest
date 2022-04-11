import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from './dto/send-message.dto';
import { SapcaiService } from './sapcai.service';
import { MessageType, Role } from '@virtual-me/virtual-me-ts-core';
import { UserService } from '../user/user.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/common/decorator/user.decorator';
import { UserDocument } from 'src/user/schema/user.schema';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('SAP CAI')
@Controller('sapcai')
export class SapcaiController {
  constructor(
    private sapCaiService: SapcaiService,
    private userService: UserService,
  ) {}

  @Roles(Role.GUEST, Role.USER)
  @Post()
  async dialog(
    @Body() { message, restart }: SendMessageDto,
    @User() { _id: userId, conversations }: UserDocument,
  ) {
    let convId = conversations?.[0].conversationId;
    if (restart || restart) {
      convId = uuidv4();
      this.userService.restartConversation(userId, convId);
    }

    const dialogRequest = {
      conversation_id: convId,
      message: {
        type: MessageType.TEXT,
        content: message,
      },
    };
    const res = await firstValueFrom(
      this.sapCaiService.dialogWithRefresh(dialogRequest),
    );
    return res.data.results;
  }
}
