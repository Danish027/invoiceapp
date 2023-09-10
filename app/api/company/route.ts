import { prisma } from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    let {
      name,
      email,
      mobileNumber,
      addressLine1,
      addressLine2,
      state,
      gstin,
      panNumber,
      note,
      declaration,
      bankName,
      accountNumber,
      bankBranch,
      ifscCode,
      currentInvoiceNumber,
      currentEstimateNumber,
      invoiceFormat,
    } = await req.json();
    currentInvoiceNumber = +currentInvoiceNumber;
    currentEstimateNumber = +currentEstimateNumber;
    const createdCompany = await prisma.company.create({
      data: {
        userId: currentUser?.id,
        name,
        email,
        mobileNumber,
        addressLine1,
        addressLine2,
        state,
        gstin,
        panNumber,
        declaration,
        note,
        bankName,
        accountNumber: accountNumber,
        bankBranch,
        ifscCode,
        currentInvoiceNumber,
        currentEstimateNumber,
        invoiceFormat,
      },
    });
    return NextResponse.json(createdCompany);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }
  const companyDetails = await prisma.company.findFirst({
    where: {
      userId: currentUser.id,
    },
  });
  return NextResponse.json(companyDetails);
}

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    let {
      name,
      email,
      mobileNumber,
      addressLine1,
      addressLine2,
      state,
      gstin,
      panNumber,
      note,
      declaration,
      bankName,
      accountNumber,
      bankBranch,
      ifscCode,
      currentInvoiceNumber,
      currentEstimateNumber,
      invoiceFormat,
    } = await req.json();
    if (!currentUser) {
      return NextResponse.error();
    }
    currentInvoiceNumber = +currentInvoiceNumber;
    currentEstimateNumber = +currentEstimateNumber;
    const updatedDetails = await prisma.company.update({
      where: {
        userId: currentUser.id,
      },
      data: {
        name,
        email,
        mobileNumber,
        addressLine1,
        addressLine2,
        state,
        gstin,
        panNumber,
        declaration,
        note,
        bankName,
        accountNumber: accountNumber,
        bankBranch,
        ifscCode,
        currentInvoiceNumber,
        currentEstimateNumber,
        invoiceFormat,
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
