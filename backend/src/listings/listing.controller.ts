import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthenticatedUser } from '../auth/auth.types';
import { ListingService } from './listing.service';

interface ListingBody {
  title: string;
  description: string;
  roomType: string;
  monthlyRent: number;
  location: string;
  features?: string[];
}

@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  findAll(
    @Query('location') location?: string,
    @Query('roomType') roomType?: string,
    @Query('status') status?: string,
  ) {
    return this.listingService.findAll({ location, roomType, status });
  }

  @Get('mine')
  @UseGuards(AuthGuard)
  findMine(@CurrentUser() user: AuthenticatedUser) {
    return this.listingService.findMine(user);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.listingService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() body: ListingBody,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.listingService.create(body, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: ListingBody,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.listingService.update(id, body, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.listingService.remove(id, user);
  }
}
