export interface JwtPayload {
  id?: number;
  role?: UserRole;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
