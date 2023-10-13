import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignUpDto } from './dto/sign-up.dto';

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

  async signIn(user: any) {
    const payload = {
      username: user.username,
      role: user.role,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signupDto: SignUpDto) {
    const createUserDto = new CreateUserDto();
    createUserDto.username = signupDto.username;
    createUserDto.password = signupDto.password;
    createUserDto.email = signupDto.email;
    return this.usersService.create(createUserDto);
  }
}
