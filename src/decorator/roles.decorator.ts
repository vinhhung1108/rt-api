import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enum/roles.enum';

export const ROLE_KEY = 'has_role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
