import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignupDto } from './dto/signupDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password) {
      const authenticated = await compare(password, user.password);
      if (authenticated) {
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      role: user.role,
      conversations: user.conversations,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto) {
    const creatUserDto = new CreateUserDto();
    creatUserDto.username = signupDto.username;
    creatUserDto.password = signupDto.password;
    creatUserDto.email = signupDto.email;
    return this.usersService.create(creatUserDto);
  }
}
