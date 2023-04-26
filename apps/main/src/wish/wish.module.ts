import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishController } from './wish.controller';
import { WishRepository } from './wish.repository';
import { Wish, WishSchema } from './wish.schema';
import { WishUseCase } from './wish.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wish.name,
        schema: WishSchema,
      },
    ]),
  ],
  controllers: [WishController],
  providers: [WishRepository, WishUseCase],
  exports: [WishRepository],
})
export class WishModule {}
