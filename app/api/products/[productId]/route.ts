import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  productId?: number;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const { productId } = params;

    if (!currentUser) {
      return NextResponse.error();
    }

    const id = Number(productId);
    const updatedDetails = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(updatedDetails);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
