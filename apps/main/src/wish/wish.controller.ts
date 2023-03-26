import { Controller, Get } from '@nestjs/common';

@Controller('wish')
export class WishController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
