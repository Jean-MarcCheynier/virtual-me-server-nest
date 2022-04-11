import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@virtual-me/virtual-me-ts-core';
import { User } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            uri: config.get('database.uri'),
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [UserController],
      providers: [UserService, ConfigService],
    }).compile();

    controller = await module.resolve<UserController>(UserController);
    service = await module.resolve(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          username: 'test',
          email: 'test@test.com',
          role: [Role.ADMIN],
          password: 'xyz',
          conversations: [
            {
              conversationId: 'xyz',
            },
          ],
        },
      ];

      const result: Promise<User[]> = new Promise<User[]>((resolve, reject) => {
        return resolve(users);
      });
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await service.findAll()).toBe(result);
    });
  });
});
