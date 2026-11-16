import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post('me/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_request, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          callback(new Error('Only image files are allowed'), false);
          return;
        }
        callback(null, true);
      },
    }),
  )
  uploadAvatar(
    @CurrentUser() user: AuthenticatedUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.profileService.updateAvatar(user, file);
  }
}
