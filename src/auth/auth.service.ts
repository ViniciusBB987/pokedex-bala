import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userService.create(createUserDto);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByUsername(username: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
  const payload = { username: user.username, sub: user.userId };
  return {
    access_token: this.jwtService.sign(payload),
      };
  }
}