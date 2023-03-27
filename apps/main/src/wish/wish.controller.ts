import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateWishDto } from './entities/wish.entity';
import { WishUseCase } from './wish.use-case';

@ApiTags('wish')
@Controller('wish')
export class WishController {
  constructor(private wishUseCase: WishUseCase) {}

  @Get()
  findAll() {
    return this.wishUseCase.findAll();
  }

  @Post('/')
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishUseCase.create(createWishDto);
  }
}
