import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorator/public.decorator';
import { User } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async sigin(@Body() signinDto: SigninDto, @Request() req) {
    return this.authService.signin(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const createdUser: User = await this.authService.signup(signupDto);
    return createdUser;
  }
}
