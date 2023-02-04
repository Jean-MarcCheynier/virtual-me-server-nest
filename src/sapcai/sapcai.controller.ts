import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from './dto/send-message.dto';
import { SapcaiService } from './sapcai.service';
import { MessageType, Role } from '@virtual-me/virtual-me-ts-core';
import { UserService } from '../user/user.service';
import { Roles } from '../common/decorator/roles.decorator';
import { firstValueFrom } from 'rxjs';
import { User } from '../common/decorator/user.decorator';
import { UserDocument } from '../user/schema/user.schema';
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
    @Body() sendMessageDto: SendMessageDto,
    @User() { _id: userId, conversations }: UserDocument,
  ) {
    const convId = conversations?.[0].conversationId || uuidv4();
    this.userService.startConversation(userId, convId);
    const dialogRequest = {
      conversation_id: convId,
      message: {
        type: MessageType.TEXT,
        content: sendMessageDto.message,
      },
    };
    const res = await firstValueFrom(
      this.sapCaiService.dialogWithRefresh(dialogRequest),
    );
    return res.data.results;
  }
}
