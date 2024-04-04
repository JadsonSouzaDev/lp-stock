import { sql } from "@vercel/postgres";

import { User } from "@/types/user";

export const serializeUser = (row: any): User => {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    active: row.active,
    roles: row.roles,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
};

export const getUserByEmail = async (email: string) => {
  const { rows } =
    await sql`SELECT * FROM "user" WHERE email = ${email} and active = true`;
  const user = rows.map(serializeUser)[0];
  return user;
};

export const getUserById = async (id: string) => {
  const { rows } =
    await sql`SELECT * FROM "user" WHERE id = ${id} and active = true`;
  const user = rows.map(serializeUser)[0];
  return user;
};
