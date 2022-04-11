import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom } from 'rxjs';
import { SapcaiService } from './sapcai.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { RequestTokenResponse } from './sapcai.types';

describe('SapcaiService', () => {
  let service: SapcaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.development.env',
          isGlobal: true,
          load: [configuration],
          cache: true,
        }),
        HttpModule,
      ],
      providers: [SapcaiService],
    }).compile();

    service = module.get<SapcaiService>(SapcaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a request token', async () => {
    const requestTokenResponse: RequestTokenResponse = await firstValueFrom(
      service.requestToken(),
    );
    console.log(requestTokenResponse);
    expect(requestTokenResponse).toHaveProperty('access_token');
    expect(requestTokenResponse).toHaveProperty('access_token');
  });

  it('should return a dialog response', async () => {
    const requestTokenResponse: RequestTokenResponse = await firstValueFrom(
      service.requestToken(),
    );
    const dialogResponse = await firstValueFrom(
      service.dialog(
        {
          conversation_id: 'test-1591710783036',
          message: {
            type: 'text',
            content: 'Bonjour',
          },
        },
        requestTokenResponse.access_token,
        requestTokenResponse.token_type,
      ),
    );

    const results = dialogResponse.data.results;
    expect(results).toBeDefined();
    expect(results.messages.length).not.toEqual(0);
    expect(results.messages[0]).toHaveProperty('content');
  });
});
