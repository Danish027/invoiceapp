import { prisma } from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { name, addressLine1, addressLine2, state, gstin } = await req.json();
    const cretedCustomer = await prisma.customer.create({
      data: {
        userId: currentUser.id,
        name,
        addressLine1,
        addressLine2,
        state,
        gstin,
      },
    });
    return NextResponse.json(cretedCustomer);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }
    const fetchedCustomers = await prisma.customer.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(fetchedCustomers);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { name, addressLine1, addressLine2, state, gstin, id } =
      await req.json();
    const updatedDetails = await prisma.customer.update({
      where: {
        id: id,
      },
      data: {
        name,
        addressLine1,
        addressLine2,
        state,
        gstin,
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
