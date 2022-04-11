import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    description: 'Message to send',
  })
  message: string;
  @ApiProperty({
    description: 'Should restart conversation',
    required: false,
  })
  restart = false;
}
