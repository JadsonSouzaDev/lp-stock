import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import { User } from "@/types/user";

import { getProfile } from "../repository";

export async function GET(req: Request) {
  try {
    const headers = req.headers;
    const authorization = headers.get("Authorization");
    const token = authorization?.split(" ")[1];
    const decodedToken = jwt.decode(token ?? "") as { userId: string };

    const userId = decodedToken?.userId;
    if (!userId) {
      return NextResponse.json(
        { message: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const serializedRows: User = await getProfile(userId);
    return NextResponse.json(serializedRows, { status: 200 });
  } catch (error) {
    console.error("Error get profile - /user: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
