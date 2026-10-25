import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
  features?: string[] | string;
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
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 8 }], {
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
  create(
    @Body() body: ListingBody,
    @CurrentUser() user: AuthenticatedUser,
    @UploadedFiles()
    files: { images?: Express.Multer.File[] },
  ) {
    return this.listingService.create(body, user, files.images ?? []);
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
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.listingService.remove(id, user);
  }
}
