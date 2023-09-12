import { prisma } from "@/libs/prismadb";
import { currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.error();
    }
    const { description, hnsCode, quantity, rate, unit } = await req.json();
    const cretedCustomer = await prisma.product.create({
      data: {
        userId: user?.id,
        description,
        hnsCode,
        quantity,
        rate,
        unit,
      },
    });
    return NextResponse.json(cretedCustomer);
  } catch (err) {
    console.log(err);
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
    const fetchedProducts = await prisma.product.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        description: "asc",
      },
    });
    return NextResponse.json(fetchedProducts);
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
    const { description, hnsCode, id, quantity, rate, unit } = await req.json();
    const updatedDetails = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        description,
        hnsCode,
        id,
        quantity,
        rate,
        unit,
      },
    });
    return NextResponse.json(updatedDetails);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
