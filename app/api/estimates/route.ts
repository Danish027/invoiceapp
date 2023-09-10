import { prisma } from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    let { estimateData, items, customerId } = await req.json();
    customerId = +customerId;
    let estimateNumber = estimateData?.estimateNumber;
    estimateNumber = estimateNumber + "";
    const createdInvoice = await prisma.estimate.create({
      data: {
        userId: currentUser.id,
        companyId: customerId,
        ...estimateData,
        estimateNumber: estimateNumber,
        items: {
          create: items,
        },
      },
    });

    estimateNumber = +estimateNumber;
    estimateNumber = estimateNumber + 1;
    const updatedCompany = await prisma.company.update({
      where: {
        userId: currentUser.id,
      },
      data: {
        currentEstimateNumber: estimateNumber,
      },
    });

    return NextResponse.json(createdInvoice);
  } catch (error) {
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
    const fetchedEstimates = await prisma.estimate.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        items: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(fetchedEstimates);
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
    const { status, estimateId } = await req.json();
    const id = Number(estimateId);
    const updatedDetails = await prisma.estimate.update({
      where: {
        id: id,
      },
      data: {
        approvalStatus: status,
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
