import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { User } from "@/types/user";

import {
  createUser,
  getUserByEmail,
  getUserByPhone,
  getUsers,
  updateUser,
} from "./repository";

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
    const user = (await req.json()) as User;
    const existUserWithEmail = await getUserByEmail(user.email);
    const existUserWithPhone = await getUserByPhone(user.phone);

    if (existUserWithEmail) {
      return NextResponse.json(
        { message: "Já existe um usuário cadastrado com esse e-mail" },
        { status: 400 }
      );
    }

    if (existUserWithPhone) {
      return NextResponse.json(
        { message: "Já existe um usuário cadastrado com esse telefone" },
        { status: 400 }
      );
    }

    const saveduser: User = await createUser(user);
    return NextResponse.json(saveduser, { status: 201 });
  } catch (error) {
    console.error("Error creating user - /user: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, res: NextApiResponse) {
  try {
    const user = (await req.json()) as User;
    const existUserWithEmail = await getUserByEmail(user.email);
    const existUserWithPhone = await getUserByPhone(user.phone);

    if (existUserWithEmail && existUserWithEmail.id !== user.id) {
      return NextResponse.json(
        { message: "Já existe um usuário cadastrado com esse e-mail" },
        { status: 400 }
      );
    }

    if (existUserWithPhone && existUserWithPhone.id !== user.id) {
      return NextResponse.json(
        { message: "Já existe um usuário cadastrado com esse telefone" },
        { status: 400 }
      );
    }

    const saveduser: User = await updateUser(user);
    return NextResponse.json(saveduser, { status: 200 });
  } catch (error) {
    console.error("Error creating user - /user: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
