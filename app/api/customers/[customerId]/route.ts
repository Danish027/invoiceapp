import { prisma } from "@/libs/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
interface IParams {
  customerId?: number;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const user = await currentUser();
    const { customerId } = params;

    if (!user) {
      return NextResponse.error();
    }

    const id = Number(customerId);
    const updatedDetails = await prisma.customer.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(updatedDetails);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const user = await currentUser();
    const { customerId } = params;

    if (!user) {
      return NextResponse.error();
    }

    const id = Number(customerId);
    const customerDetail = await prisma.customer.findFirst({
      where: {
        id: id,
      },
    });
    return NextResponse.json(customerDetail);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
