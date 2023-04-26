import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyKeys, Model } from 'mongoose';
import { MongoRepository } from '@main/mongo-repository/abstract-mongo.repositiory';

import { Wish, WishDocument } from './wish.schema';

@Injectable()
export class WishRepository implements MongoRepository<Wish> {
  constructor(@InjectModel(Wish.name) private wishModel: Model<WishDocument>) {}

  create(createWishDto: Partial<Wish>): Promise<Wish> {
    const createdWish = new this.wishModel(createWishDto);
    return createdWish.save();
  }

  clear(): any {
    return this.wishModel.deleteMany();
  }

  findAll(): Promise<Wish[]> {
    return this.wishModel.find().exec();
  }

  findById(id: string) {
    return this.wishModel.findById(id).exec();
  }

  update(id: string, updateWishDto: any) {
    return this.wishModel.findByIdAndUpdate(id, updateWishDto).exec();
  }

  remove(id: string) {
    return this.wishModel.findByIdAndDelete(id).exec();
  }

  removeAll() {
    return this.wishModel.remove().exec();
  }
}
