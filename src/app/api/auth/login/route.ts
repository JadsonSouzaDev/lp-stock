import { NextResponse } from "next/server";

import { login } from "../service";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const response = await login(email, password);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
