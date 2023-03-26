import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model } from 'mongoose';
import { MongoRepository } from '@main/mongo-repository/abstract-mongo.repositiory';

import { Wish, WishDocument } from './wish.schema';
import { WishRepository } from './wish.repository';

@Injectable()
export class WishUseCase {
  constructor(private wishRepository: WishRepository) {}

  create(createWishDto: Partial<Wish>): Promise<Wish> {
    return this.wishRepository.create(createWishDto);
  }

  update(id: string, updateWishDto: any) {
    return this.wishRepository.update(id, updateWishDto);
  }
}
