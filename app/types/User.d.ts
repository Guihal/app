export type UserRole = "user" | "admin";

export type User = {
  id: number;
  username: string;
  role: UserRole;
};
