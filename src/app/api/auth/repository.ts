import { sql } from "@vercel/postgres";

import { User } from "@/types/user";

import { UserSignup } from "./service";

export const serializeUser = (row: any): User => {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
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

export const getUserByPhone = async (phone: string) => {
  const { rows } =
    await sql`SELECT * FROM "user" WHERE phone = ${phone} and active = true`;
  const user = rows.map(serializeUser)[0];
  return user;
};

export const getUserById = async (id: string) => {
  const { rows } =
    await sql`SELECT * FROM "user" WHERE id = ${id} and active = true`;
  const user = rows.map(serializeUser)[0];
  return user;
};

export const createUser = async (userData: UserSignup) => {
  const { rows } = await sql`
    INSERT INTO "user" (name, email, phone, password, roles)
    VALUES (${userData.name}, ${userData.email}, ${userData.phone}, ${userData.password}, ARRAY['CLIENT'])
    RETURNING *;
  `;
  const user = rows.map(serializeUser)[0];
  return user;
};
