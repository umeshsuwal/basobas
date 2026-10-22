import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, randomBytes, scrypt as scryptCallback } from 'node:crypto';
import { promisify } from 'node:util';
import { PrismaService } from '../prisma.service';
import type { AuthenticatedUser } from './auth.types';

const scrypt = promisify(scryptCallback);
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30;

interface SignupInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'tenant' | 'landlord';
}

interface LoginInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(input: SignupInput) {
    const name = input.name.trim();
    const email = input.email.trim().toLowerCase();
    const phone = input.phone.trim();

    if (
      !name ||
      !email ||
      !phone ||
      input.password.length < 8 ||
      !['tenant', 'landlord'].includes(input.role)
    ) {
      throw new UnauthorizedException(
        'Name, phone, email, and a password of at least 8 characters are required',
      );
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        phone,
        role: input.role,
        passwordHash: await this.hashPassword(input.password),
      },
    });

    return this.createAuthResponse(user);
  }

  async login(input: LoginInput) {
    const email = input.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await this.verifyPassword(input.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.createAuthResponse(user);
  }

  async validateSession(token: string): Promise<AuthenticatedUser | null> {
    const session = await this.prisma.session.findUnique({
      where: { tokenHash: this.hashToken(token) },
      include: { user: true },
    });

    if (!session) return null;

    if (session.expiresAt <= new Date()) {
      await this.prisma.session.delete({ where: { id: session.id } });
      return null;
    }

    const { passwordHash: _passwordHash, ...user } = session.user;
    return user;
  }

  async revokeSession(token: string) {
    await this.prisma.session.deleteMany({
      where: { tokenHash: this.hashToken(token) },
    });
  }

  private async createAuthResponse(user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  }) {
    const token = randomBytes(32).toString('hex');
    await this.prisma.session.create({
      data: {
        tokenHash: this.hashToken(token),
        userId: user.id,
        expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
      },
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  private async hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  private async verifyPassword(password: string, storedHash: string) {
    const [salt, expectedHash] = storedHash.split(':');
    if (!salt || !expectedHash) return false;

    const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
    return derivedKey.toString('hex') === expectedHash;
  }

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }
}
