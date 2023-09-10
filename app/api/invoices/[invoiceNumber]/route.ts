import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  invoiceNumber?: number;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { invoiceNumber } = params;

    if (!currentUser) {
      return NextResponse.error();
    }

    const number = String(invoiceNumber);
    const updatedDetails = await prisma.invoice.findFirst({
      where: {
        userId: currentUser.id,
        invoiceNumber: number,
      },
      include: {
        items: true,
      },
    });
    return NextResponse.json(updatedDetails);
  } catch (error) {
    console.log(error);
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
    let { invoiceData, items, customerId } = await req.json();
    customerId = +customerId;

    let id = invoiceData?.id;
    id = +id;
    const createdInvoice = await prisma.invoice.update({
      where: {
        id: id,
      },
      data: {
        // userId: currentUser.id,
        customerId: customerId,
        ...invoiceData,
        items: {
          deleteMany: {}, // Delete all existing items
          create: items.map((item: any) => ({
            ...item,
          })),
        },
      },
    });

    return NextResponse.json(createdInvoice);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
