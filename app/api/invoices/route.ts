import { prisma } from "@/libs/prismadb";

import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { currentUser } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    let { invoiceData, items, customerId } = await req.json();
    customerId = +customerId;
    let invoiceNumber = invoiceData?.invoiceNumber;
    invoiceNumber = invoiceNumber + "";
    const createdInvoice = await prisma.invoice.create({
      data: {
        userId: user?.id,
        customerId: customerId,
        ...invoiceData,
        invoiceNumber: invoiceNumber,
        items: {
          create: items,
        },
      },
    });

    invoiceNumber = +invoiceNumber;
    invoiceNumber = invoiceNumber + 1;
    const updatedCompany = await prisma.company.update({
      where: {
        userId: user?.id,
      },
      data: {
        currentInvoiceNumber: invoiceNumber,
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

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.error();
    }
    const fetchedInvoice = await prisma.invoice.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(fetchedInvoice);
  } catch (err) {
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
    const { status, invoiceId } = await req.json();
    const id = Number(invoiceId);
    const updatedDetails = await prisma.invoice.update({
      where: {
        id: id,
      },
      data: {
        paymentStatus: status,
      },
    });
    return NextResponse.json(updatedDetails);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
