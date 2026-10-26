import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { AuthenticatedUser } from '../auth/auth.types';

interface ProfileUpdateInput {
  name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  occupation?: string;
  preferredLocations?: string[] | string;
  preferences?: string[] | string;
  avatarUrl?: string;
}

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentProfile(user: AuthenticatedUser) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { landlordProfile: true, tenantProfile: true },
    });

    if (!currentUser) {
      throw new NotFoundException('User profile was not found');
    }

    const { passwordHash: _passwordHash, ...safeUser } = currentUser;
    return {
      user: safeUser,
      profile:
        currentUser.role === 'landlord'
          ? currentUser.landlordProfile
          : currentUser.tenantProfile,
    };
  }

  async updateCurrentProfile(
    user: AuthenticatedUser,
    input: ProfileUpdateInput,
  ) {
    const name = input.name?.trim();
    const phone = input.phone?.trim();

    if (input.name !== undefined && !name) {
      throw new BadRequestException('Name cannot be empty');
    }
    if (input.phone !== undefined && !phone) {
      throw new BadRequestException('Phone cannot be empty');
    }

    const profileData = {
      bio: this.optionalText(input.bio),
      location: this.optionalText(input.location),
      occupation: this.optionalText(input.occupation),
      avatarUrl: this.optionalText(input.avatarUrl),
      preferredLocations: this.toStringArray(input.preferredLocations),
      preferences: this.toStringArray(input.preferences),
    };

    const updatedUser = await this.prisma.$transaction(async (transaction) => {
      await transaction.user.update({
        where: { id: user.id },
        data: {
          ...(name !== undefined ? { name } : {}),
          ...(phone !== undefined ? { phone } : {}),
        },
      });

      if (user.role === 'landlord') {
        await transaction.landlordProfile.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            bio: profileData.bio,
            location: profileData.location,
            avatarUrl: profileData.avatarUrl,
          },
          update: {
            bio: profileData.bio,
            location: profileData.location,
            avatarUrl: profileData.avatarUrl,
          },
        });
      } else if (user.role === 'tenant') {
        await transaction.tenantProfile.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            bio: profileData.bio,
            occupation: profileData.occupation,
            preferredLocations: profileData.preferredLocations ?? [],
            preferences: profileData.preferences ?? [],
            avatarUrl: profileData.avatarUrl,
          },
          update: {
            bio: profileData.bio,
            occupation: profileData.occupation,
            ...(profileData.preferredLocations !== undefined
              ? { preferredLocations: profileData.preferredLocations }
              : {}),
            ...(profileData.preferences !== undefined
              ? { preferences: profileData.preferences }
              : {}),
            avatarUrl: profileData.avatarUrl,
          },
        });
      } else {
        throw new ForbiddenException('Unsupported user role');
      }

      return transaction.user.findUniqueOrThrow({
        where: { id: user.id },
        include: { landlordProfile: true, tenantProfile: true },
      });
    });

    const { passwordHash: _passwordHash, ...safeUser } = updatedUser;
    return {
      user: safeUser,
      profile:
        updatedUser.role === 'landlord'
          ? updatedUser.landlordProfile
          : updatedUser.tenantProfile,
    };
  }

  private optionalText(value: string | undefined) {
    return value === undefined ? undefined : value.trim() || null;
  }

  private toStringArray(value: string[] | string | undefined) {
    if (value === undefined) return undefined;
    const values = Array.isArray(value) ? value : value.split(',');
    return values.map((item) => item.trim()).filter(Boolean);
  }
}
