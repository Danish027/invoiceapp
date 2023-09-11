import { prisma } from "@/libs/prismadb";
import { currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.error();
    }
    const { name, addressLine1, addressLine2, state, gstin } = await req.json();
    const cretedCustomer = await prisma.customer.create({
      data: {
        userId: user.id,
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
    const user = await currentUser();

    if (!user) {
      return NextResponse.error();
    }
    const fetchedCustomers = await prisma.customer.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(fetchedCustomers);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
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
