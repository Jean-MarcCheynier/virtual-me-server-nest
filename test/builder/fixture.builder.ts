import { Type } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { MongoRepository } from '../../src/mongo-repository/abstract-mongo.repositiory';

export abstract class FixtureBuilder<T> {
  protected fixture: T;
  protected repository: MongoRepository<T>;

  constructor(module: TestingModule, TRepository: Type<MongoRepository<T>>) {
    this.repository = module?.get(TRepository);
  }

  async create(): Promise<T> {
    return this.repository.create(this.fixture);
  }
}
