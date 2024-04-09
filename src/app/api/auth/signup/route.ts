import { NextResponse } from "next/server";

import { signup } from "../service";

export async function POST(req: Request) {
  try {
    const signupData = await req.json();
    const response = await signup(signupData);
    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
