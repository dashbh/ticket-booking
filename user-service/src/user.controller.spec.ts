import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoginDto } from './schema/user.dto';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import IORedisMock from 'ioredis-mock';

// Create a mock Redis client using ioredis-mock
const mockRedisClient = new IORedisMock();

jest.mock('amqplib', () => ({
  connect: jest.fn(() => Promise.resolve({
    createChannel: jest.fn(() => Promise.resolve({
      assertExchange: jest.fn(),
      assertQueue: jest.fn(),
      publish: jest.fn(),
      consume: jest.fn(),
    })),
    close: jest.fn(),
  })),
}));

describe('AppController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => 'mocked-jwt-token',
          },
        },
        {
          provide: 'REDIS_CLIENT', // Use a custom token to inject the Redis client
          useValue: mockRedisClient, // Use the mock Redis client
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(userController).toBeDefined();
    });

    it('should authenticate and return a user', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'testpassword',
      };

      const authenticatedUser: any = {
        token: 'mocked-jwt-token',
        userId: 'testuser',
      };

      jest.spyOn(userService, 'login').mockResolvedValue(authenticatedUser);

      const result = await userController.login(loginDto);
      console.log(result)

      expect(result).toEqual(authenticatedUser);
    });
  });
});
