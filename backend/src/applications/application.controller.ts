import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthenticatedUser } from '../auth/auth.types';
import { ApplicationService } from './application.service';

@Controller('applications')
@UseGuards(AuthGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { listingId: string; message: string },
  ) {
    return this.applicationService.create(user, body);
  }

  @Get('mine')
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.applicationService.findMine(user);
  }

  @Get('received')
  findReceived(@CurrentUser() user: AuthenticatedUser) {
    return this.applicationService.findReceived(user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { status: 'pending' | 'approved' | 'rejected' },
  ) {
    return this.applicationService.updateStatus(id, user, body.status);
  }
}
