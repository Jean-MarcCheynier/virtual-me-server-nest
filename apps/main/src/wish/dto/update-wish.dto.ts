import { PickType } from '@nestjs/swagger';
import { WishEntity } from '../entities/wish.entity';

export class UpdateWishDto extends PickType(WishEntity, [
  'name',
  'url',
  'imageUrl',
  'price',
  'states',
  'description',
] as const) {}
