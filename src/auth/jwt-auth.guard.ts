import { Injectable, ExecutionContext, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const decoded = this.jwtService.verify(token);
    const user = await this.authService.validateUserByUsername(decoded.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}