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
import { SignInDto } from './dto/sign-in.dto';
import { Public } from '../common/decorator/public.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../user/schema/user.schema';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async sigIn(@Body() _signInDto: SignInDto, @Request() req) {
    return this.authService.signIn(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    const createdUser: User = await this.authService.signUp(signupDto);
    console.log(createdUser);
    return createdUser;
  }
}
