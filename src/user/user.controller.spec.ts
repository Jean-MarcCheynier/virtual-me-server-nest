import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@virtual-me/virtual-me-ts-core';
import { cryptPwd, User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://test:W7MadYP4RbR8wMYk@cportfolio.3v9yf.gcp.mongodb.net/test?retryWrites=true&w=majority',
        ),
        MongooseModule.forFeatureAsync([
          {
            name: User.name,
            useFactory: () => {
              const schema = UserSchema;
              schema.pre('save', cryptPwd);
              return schema;
            },
          },
        ]),
      ],
      controllers: [UserController],
      providers: [UserService],
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
