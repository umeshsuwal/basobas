import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CloudinaryService } from './cloudinary.service';

interface ListingInput {
  title: string;
  description: string;
  roomType: string;
  monthlyRent: number;
  location: string;
  features?: string[] | string;
}

interface ListingFilters {
  location?: string;
  roomType?: string;
  status?: string;
}

@Injectable()
export class ListingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async findAll(filters: ListingFilters = {}) {
    return this.prisma.listing.findMany({
      where: {
        status: filters.status ?? 'active',
        ...(filters.location
          ? { location: { contains: filters.location.trim() } }
          : {}),
        ...(filters.roomType ? { roomType: filters.roomType.trim() } : {}),
      },
      include: { features: true, images: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: { features: true, images: true },
    });
    if (!listing) throw new NotFoundException('Listing not found');
    return listing;
  }

  async findMine(user: AuthenticatedUser) {
    this.requireLandlord(user);
    return this.prisma.listing.findMany({
      where: { landlordId: user.id },
      include: { features: true, images: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(
    input: ListingInput,
    user: AuthenticatedUser,
    files: Express.Multer.File[] = [],
  ) {
    this.requireLandlord(user);
    const data = this.validateInput(input);
    const uploadedImages = await Promise.all(
      files.map((file) => this.cloudinary.uploadListingImage(file)),
    );

    return this.prisma.listing.create({
      data: {
        ...data,
        landlordId: user.id,
        features: data.features
          ? { create: data.features.map((name) => ({ name })) }
          : undefined,
        images: uploadedImages.length
          ? { create: uploadedImages }
          : undefined,
      },
      include: { features: true, images: true },
    });
  }

  async update(id: string, input: ListingInput, user: AuthenticatedUser) {
    this.requireLandlord(user);
    await this.requireOwnership(id, user);
    const data = this.validateInput(input);

    return this.prisma.$transaction(async (transaction) => {
      await transaction.listingFeature.deleteMany({ where: { listingId: id } });
      return transaction.listing.update({
        where: { id },
        data: {
          ...data,
          features: data.features
            ? { create: data.features.map((name) => ({ name })) }
            : undefined,
        },
        include: { features: true, images: true },
      });
    });
  }

  async remove(id: string, user: AuthenticatedUser) {
    this.requireLandlord(user);
    await this.requireOwnership(id, user);
    await this.prisma.listing.delete({ where: { id } });
    return { success: true };
  }

  private async requireOwnership(id: string, user: AuthenticatedUser) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      select: { landlordId: true },
    });
    if (!listing) throw new NotFoundException('Listing not found');
    if (listing.landlordId !== user.id) {
      throw new ForbiddenException('You can only manage your own listings');
    }
  }

  private requireLandlord(user: AuthenticatedUser) {
    if (user.role !== 'landlord') {
      throw new ForbiddenException('Only landlords can manage listings');
    }
  }

  private validateInput(input: ListingInput): Omit<
    Prisma.ListingCreateInput,
    'landlord' | 'features'
  > & { features?: string[] } {
    const title = input.title?.trim();
    const description = input.description?.trim();
    const roomType = input.roomType?.trim();
    const location = input.location?.trim();
    const monthlyRent = Number(input.monthlyRent);
    const rawFeatures =
      typeof input.features === 'string'
        ? this.parseFeatures(input.features)
        : input.features;
    const features = Array.isArray(rawFeatures)
      ? [
          ...new Set(
            rawFeatures
              .filter((feature): feature is string => typeof feature === 'string')
              .map((feature) => feature.trim())
              .filter(Boolean),
          ),
        ]
      : undefined;

    if (
      !title ||
      !description ||
      !roomType ||
      !location ||
      !Number.isInteger(monthlyRent) ||
      monthlyRent <= 0
    ) {
      throw new BadRequestException(
        'Title, description, room type, location, and a positive monthly rent are required',
      );
    }

    return { title, description, roomType, monthlyRent, location, features };
  }

  private parseFeatures(features: string) {
    try {
      const parsed: unknown = JSON.parse(features);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      throw new BadRequestException('Features must be a valid JSON array');
    }
  }
}
