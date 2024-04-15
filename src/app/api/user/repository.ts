import { sql } from "@vercel/postgres";

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

export const getUsers = async (): Promise<User[]> => {
  const { rows } =
    await sql`select * from "user" u where u.active = true and 'ADMIN' != ALL(u.roles) order by u.createdAt desc`;
  return rows.map(serializeUser);
};

export const createUser = async (user: User): Promise<User> => {
  const { rows } = await sql`
    insert into "user" (name, email, active) values (${user.name}, ${user.email}, true) returning *`;
  return serializeUser(rows[0]);
};

export const updateUser = async (user: User): Promise<User> => {
  const { rows } = await sql`
    update "user" set name = ${user.name}, email = ${user.email}, updatedat = now() where id = ${user.id} returning *`;
  return serializeUser(rows[0]);
};

export const deleteUser = async (id: string): Promise<void> => {
  await sql`update "user" set active = false where id = ${id}`;
};
