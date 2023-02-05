import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorator/public.decorator';
import { SignupDto } from './dto/signupDto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/schema/user.schema';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const createdUser: User = await this.authService.signup(signupDto);
    console.log(createdUser);
    return createdUser;
  }
}
