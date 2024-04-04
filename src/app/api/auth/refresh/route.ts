import { NextResponse } from "next/server";

import { acquireNewToken } from "../service";

export async function POST(req: Request) {
  try {
    const refreshToken = req.headers.get("Authorization")?.split(" ")[1];
    const response = await acquireNewToken(refreshToken as string);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
