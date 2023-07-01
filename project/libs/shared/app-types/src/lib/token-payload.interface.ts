import { UserRole } from './user-role.enum';

export interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
}
