import { NextResponse } from "next/server";

import { User } from "@/types/user";

import { isAuthenticated } from "../../auth/service";
import { getProfile } from "../repository";

import { updateProfile } from "./service";

export async function GET(req: Request) {
  try {
    const decodedToken = await isAuthenticated(req);
    const user: User = await getProfile(decodedToken.userId);
    return NextResponse.json(
      { name: user.name, email: user.email, phone: user.phone },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error get profile - /user: ", error);
    return NextResponse.json(
      { message: error },
      { status: error.cause === "no_auth" ? 401 : 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const decodedToken = await isAuthenticated(req);
    const body = await req.json();
    await updateProfile(decodedToken.userId, body);
    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    console.error("Error update profile - /user: ", error);
    return NextResponse.json(
      { message: error },
      { status: error.cause === "no_auth" ? 401 : 500 }
    );
  }
}
