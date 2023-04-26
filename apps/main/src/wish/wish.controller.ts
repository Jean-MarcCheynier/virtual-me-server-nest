import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishUseCase } from './wish.use-case';

@ApiTags('Wish')
@Controller('wish')
export class WishController {
  constructor(private wishUseCase: WishUseCase) {}

  @Get()
  findAll() {
    return this.wishUseCase.findAll();
  }

  /**
   * Create some resource
   */
  @Post('/')
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishUseCase.create(createWishDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishUseCase.update(id, updateWishDto);
  }
}
