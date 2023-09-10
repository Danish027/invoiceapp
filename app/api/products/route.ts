import { prisma } from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { description, hnsCode, quantity, rate, unit } = await req.json();
    const cretedCustomer = await prisma.product.create({
      data: {
        userId: currentUser.id,
        description,
        hnsCode,
        quantity,
        rate,
        unit,
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
    const fetchedProducts = await prisma.product.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        description: "asc",
      },
    });
    return NextResponse.json(fetchedProducts);
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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
