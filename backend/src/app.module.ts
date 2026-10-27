import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { PrismaService } from './prisma.service';
import { ListingController } from './listings/listing.controller';
import { ListingService } from './listings/listing.service';
import { CloudinaryService } from './listings/cloudinary.service';
import { ProfileController } from './profiles/profile.controller';
import { ProfileService } from './profiles/profile.service';
import { ApplicationController } from './applications/application.controller';
import { ApplicationService } from './applications/application.service';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'backend',
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    ListingController,
    ProfileController,
    ApplicationController,
  ],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    AuthGuard,
    ListingService,
    CloudinaryService,
    ProfileService,
    ApplicationService,
  ],
})
export class AppModule {}
