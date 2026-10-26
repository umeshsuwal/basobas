import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthenticatedUser } from '../auth/auth.types';
import { ProfileService } from './profile.service';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  getCurrentProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.profileService.getCurrentProfile(user);
  }

  @Patch('me')
  updateCurrentProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body()
    body: {
      name?: string;
      phone?: string;
      bio?: string;
      location?: string;
      occupation?: string;
      preferredLocations?: string[] | string;
      preferences?: string[] | string;
      avatarUrl?: string;
    },
  ) {
    return this.profileService.updateCurrentProfile(user, body);
  }
}
