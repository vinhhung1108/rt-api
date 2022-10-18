import { SetMetadata } from '@nestjs/common';
// import { Role } from 'src/enum/role.enum';
// import { Role } from 'src/role/schemas/role.schema';

export const ROLE_KEY = 'has_role';
export const Roles = (...roles: string[]) => SetMetadata(ROLE_KEY, roles);
