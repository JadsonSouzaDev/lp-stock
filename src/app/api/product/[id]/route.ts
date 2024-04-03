import { NextResponse } from "next/server";

import { desactivateProduct } from "../repository";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await desactivateProduct(id as string);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error update product - /product: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
