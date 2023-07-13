import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { RegisterDto, LoginDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import redisConf from './config/redis.config';

@Injectable()
export class UserService {
  private readonly redisClient: Redis;

  constructor(@InjectModel('User') private userModel: Model<User>) {
    this.redisClient = new Redis(`redis://${redisConf.host}:${redisConf.port}`);
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = new this.userModel({
      ...registerDto,
      password: hashedPassword,
    });

    return user.save();
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ username: loginDto.username });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    const sessionId = this.generateSessionId();
    await this.redisClient.set(sessionId, user.id);

    return {
      sessionId,
      userId: user.id,
    };
  }

  async getUserDetails(userId: string) {
    return this.userModel.findById(userId);
  }

  async validateUser(userId: string) {
    const user = this.userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  private generateSessionId(): string {
    return uuidv4();
  }
}
