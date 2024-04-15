import { NextApiResponse } from "next";

import { User } from "@/types/user";

import { createUser, getUsers, updateUser } from "./repository";

export async function GET() {
  try {
    const serializedRows: User[] = await getUsers();
    return Response.json(serializedRows);
  } catch (error) {
    console.error("Error get users - /user: ", error);
    return Response.error();
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const saveduser: User = await createUser((await req.json()) as User);
    return Response.json(saveduser);
  } catch (error) {
    console.error("Error creating user - /user: ", error);
    res.status(500);
    return Response.error();
  }
}

export async function PUT(req: Request, res: NextApiResponse) {
  try {
    const saveduser: User = await updateUser((await req.json()) as User);
    return Response.json(saveduser);
  } catch (error) {
    console.error("Error update user - /user: ", error);
    res.status(500);
    return Response.error();
  }
}
