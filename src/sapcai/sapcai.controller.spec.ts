import { Test, TestingModule } from '@nestjs/testing';
import { SapcaiController } from './sapcai.controller';

describe('SapcaiController', () => {
  let controller: SapcaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SapcaiController],
    }).compile();

    controller = module.get<SapcaiController>(SapcaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
