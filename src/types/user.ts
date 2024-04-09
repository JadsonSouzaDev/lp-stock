type Role = "ADMIN" | "CLIENT";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
};
