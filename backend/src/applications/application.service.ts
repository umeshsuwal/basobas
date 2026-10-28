import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { AuthenticatedUser } from '../auth/auth.types';

interface CreateApplicationInput {
  listingId: string;
  message: string;
}

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: AuthenticatedUser, input: CreateApplicationInput) {
    this.requireTenant(user);
    const message = input.message?.trim();
    if (!input.listingId || !message) {
      throw new NotFoundException('Listing and application message are required');
    }

    const listing = await this.prisma.listing.findUnique({
      where: { id: input.listingId },
      select: { id: true, status: true },
    });
    if (!listing || listing.status !== 'active') {
      throw new NotFoundException('Active listing not found');
    }

    const existing = await this.prisma.application.findUnique({
      where: {
        listingId_tenantId: { listingId: input.listingId, tenantId: user.id },
      },
    });
    if (existing) {
      throw new ConflictException('You have already applied for this listing');
    }

    return this.prisma.application.create({
      data: { listingId: input.listingId, tenantId: user.id, message },
      include: {
        listing: { select: { id: true, title: true, location: true, monthlyRent: true } },
      },
    });
  }

  async findMine(user: AuthenticatedUser) {
    this.requireTenant(user);
    return this.prisma.application.findMany({
      where: { tenantId: user.id },
      include: {
        listing: { select: { id: true, title: true, location: true, monthlyRent: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findReceived(user: AuthenticatedUser) {
    this.requireLandlord(user);
    return this.prisma.application.findMany({
      where: { listing: { landlordId: user.id } },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            tenantProfile: { select: { occupation: true } },
          },
        },
        listing: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(
    id: string,
    user: AuthenticatedUser,
    status: 'pending' | 'approved' | 'rejected',
  ) {
    this.requireLandlord(user);
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { listing: { select: { landlordId: true } } },
    });
    if (!application) throw new NotFoundException('Application not found');
    if (application.listing.landlordId !== user.id) {
      throw new ForbiddenException('You can only manage applications for your listings');
    }

    return this.prisma.application.update({
      where: { id },
      data: { status },
    });
  }

  private requireTenant(user: AuthenticatedUser) {
    if (user.role !== 'tenant') {
      throw new ForbiddenException('Only tenants can submit applications');
    }
  }

  private requireLandlord(user: AuthenticatedUser) {
    if (user.role !== 'landlord') {
      throw new ForbiddenException('Only landlords can manage applications');
    }
  }
}
