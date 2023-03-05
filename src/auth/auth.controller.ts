import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
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
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async sigin(@Body() signinDto: SigninDto, @Request() req) {
    return this.authService.signin(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const createdUser: User = await this.authService.signup(signupDto);
    console.log(createdUser);
    return createdUser;
  }
}
