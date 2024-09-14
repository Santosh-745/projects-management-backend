import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginpDto, SignupDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/signup")
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post("/login")
  login(@Body() body: LoginpDto) {
    return this.authService.login(body);
  }
}
