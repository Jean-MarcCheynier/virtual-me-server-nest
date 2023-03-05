import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface MongoRepository<T> {
  create(createDto: Partial<T>): Promise<T>;
  clear(): Promise<void>;
}
