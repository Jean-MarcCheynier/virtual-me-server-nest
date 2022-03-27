import { Test, TestingModule } from '@nestjs/testing';
import { SapcaiService } from './sapcai.service';

describe('SapcaiService', () => {
  let service: SapcaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SapcaiService],
    }).compile();

    service = module.get<SapcaiService>(SapcaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
