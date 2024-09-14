import { ConflictException, Injectable } from '@nestjs/common';
import { LoginpDto, SignupDto } from './dtos';
import { UserRepository } from '../users/repositories';
import { comparePassword, encryptPassword } from '../../utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async signup(body: SignupDto) {
    // validate if email already exists
    const user = await this.userRepository.findByEmail(body?.email);
    if (user) {
      throw new ConflictException('Email already exists');
    }

    // create user
    const { email, id } = await this.userRepository.store({
      ...body,
      password: await encryptPassword(body.password),
    });

    // generate token
    const payload = { sub: id, email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(body: LoginpDto) {
    const user = await this.userRepository.findByEmail(body?.email);
    if (!user) {
      throw new ConflictException('Email not found');
    }

    const isPasswordValid = await comparePassword(body.password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }

    // generate token
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
