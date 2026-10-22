import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from './current-user.decorator';
import type { AuthenticatedUser } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body()
    body: {
      name: string;
      email: string;
      phone: string;
      password: string;
      role: 'tenant' | 'landlord';
    },
  ) {
    return this.authService.signup(body);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: AuthenticatedUser) {
    return { user };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Headers('authorization') authorization: string) {
    const token = authorization.slice('Bearer '.length).trim();
    await this.authService.revokeSession(token);
    return { success: true };
  }
}
