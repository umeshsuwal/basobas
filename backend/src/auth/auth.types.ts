import type { User } from '@prisma/client';
import type { Request } from 'express';

export type AuthenticatedUser = Omit<User, 'passwordHash'>;

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
