import { NextResponse } from "next/server";

import { deleteUser } from "../repository";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await deleteUser(id as string);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error update user - /user: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
