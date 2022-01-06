import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByName(username);
    if (user && user.password) {
      console.log('user present');
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
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
