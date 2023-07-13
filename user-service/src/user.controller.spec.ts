import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoginDto } from './schema/user.dto';
import { JwtService } from '@nestjs/jwt';

describe('AppController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, JwtService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('login', () => {
    it('should authenticate and return a user', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'testpassword',
      };

      const authenticatedUser = {
        sessionId: 'testuser',
        userId: 'testuser',
      };

      jest.spyOn(userService, 'login').mockResolvedValue(authenticatedUser);

      const result = await userController.login(loginDto);

      expect(result).toEqual(authenticatedUser);
    });
  });
});
