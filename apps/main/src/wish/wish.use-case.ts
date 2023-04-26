import { Injectable } from '@nestjs/common';
import { WishRepository } from './wish.repository';
import { Wish } from './wish.schema';

@Injectable()
export class WishUseCase {
  constructor(private wishRepository: WishRepository) {}

  findAll(): Promise<Wish[]> {
    return this.wishRepository.findAll();
  }

  create(createWishDto: Partial<Wish>): Promise<Wish> {
    return this.wishRepository.create(createWishDto);
  }

  update(id: string, updateWishDto: any) {
    return this.wishRepository.update(id, updateWishDto);
  }
}
