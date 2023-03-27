import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('wish')
@Controller('wish')
export class WishController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
