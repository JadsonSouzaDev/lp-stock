import { NextResponse } from "next/server";

import { isAuthenticated } from "../../auth/service";
import { updatePassword } from "../profile/service";

export async function PUT(req: Request) {
  try {
    const decodedToken = await isAuthenticated(req);
    const body = await req.json();
    await updatePassword(decodedToken.userId, body);
    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    console.error("Error update password - /user: ", error);
    console.log(error.message);
    return NextResponse.json(
      { message: error.message },
      { status: error.cause === "no_auth" ? 401 : 400 }
    );
  }
}
