import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  estimateNumber?: number;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { estimateNumber } = params;

    if (!currentUser) {
      return NextResponse.error();
    }

    const number = String(estimateNumber);
    const updatedDetails = await prisma.estimate.findFirst({
      where: {
        userId: currentUser.id,
        estimateNumber: number,
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
    let { estimateData, items, companyId } = await req.json();
    companyId = +companyId;

    let { id, invoiceType, ...rest } = estimateData;
    id = +id;
    const createdEstimate = await prisma.estimate.update({
      where: {
        id: id,
      },
      data: {
        // userId: currentUser.id,
        companyId: companyId,
        ...rest,
        items: {
          deleteMany: {}, // Delete all existing items
          create: items.map((item: any) => ({
            ...item,
          })),
        },
      },
    });

    return NextResponse.json(createdEstimate);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
