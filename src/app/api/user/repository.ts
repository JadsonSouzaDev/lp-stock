import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

import { User } from "@/types/user";

const serializeUser = (row: any): User => {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    createdAt: row.createdat,
    updatedAt: row.updatedat,
    active: row.active,
  } as User;
};

export const getProfile = async (id: string): Promise<User> => {
  const { rows } = await sql`select * from "user" where id = ${id}`;
  return serializeUser(rows[0]);
};

export const getUsers = async (): Promise<User[]> => {
  const { rows } =
    await sql`select * from "user" u where u.active = true and 'ADMIN' != ALL(u.roles) order by u.createdAt desc`;
  return rows.map(serializeUser);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } =
    await sql`select * from "user" where email = ${email} and active = true`;
  if (rows.length === 0) return null;
  return serializeUser(rows[0]);
};

export const getUserByPhone = async (phone: string): Promise<User | null> => {
  const { rows } =
    await sql`select * from "user" where phone = ${phone} and active = true`;
  if (rows.length === 0) return null;
  return serializeUser(rows[0]);
};

export const createUser = async (user: User): Promise<User> => {
  const password = bcrypt.hashSync("mudar123", 10);
  const { rows } = await sql`
    insert into "user" (name, email, phone, roles, password, active) values (${user.name}, ${user.email}, ${user.phone}, ARRAY['CLIENT'], ${password}, true) returning *`;
  return serializeUser(rows[0]);
};

export const updateUser = async (user: User): Promise<User> => {
  const { rows } = await sql`
    update "user" set name = ${user.name}, email = ${user.email}, phone = ${user.phone}, updatedat = now() where id = ${user.id} returning *`;
  return serializeUser(rows[0]);
};

export const deleteUser = async (id: string): Promise<void> => {
  await sql`update "user" set active = false where id = ${id}`;
};
