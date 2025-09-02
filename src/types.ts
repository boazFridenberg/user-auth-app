export type Role = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
}

export interface Session {
  id: string;
  name: string;
  email: string;
  role: Role;
}
